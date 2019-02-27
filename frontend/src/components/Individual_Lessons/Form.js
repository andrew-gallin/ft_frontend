import React, { Component } from 'react';
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import './form.css'

import { Carousel } from 'react-bootstrap';
import TextQuestion from './text_template/text_question'

import Modal from '../Questions/Modal'
import LessonCreator from './LessonCreator'
const { backendCall } = require('../../helpers/backendCall')
const { requestBodyBuilder } = require('../../helpers/requestBodyBuilder')

const difficulty_map ={
    'Beginner': 0,
    'Intermediate' : 1,
    'Advanced': 2
}

export default class LessonForm extends Component {
    constructor(props, context) {
        super(props, context);


        this.updateQuestions = this.updateQuestions.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.closeModal = this.closeModal.bind(this);

        this.state = {
            value: '',
            questions:[],
            modal:false,
        };
    }

    updateQuestions(questions){
        this.setState({
            questions: questions
        })        
    }

    closeModal(){
        this.setState({ modal: false})
      }

    async handleSubmit(event){
        event.preventDefault();
        //Gathers form data and builds object where values are arrays if the field names are shared b/w multiple values
        //otherwise it is 1:1 k:v
        const data = new FormData(event.target);

        let lesson = {questions: this.state.questions}
        let keys = new Set()
        for (let key of data.keys()){
            keys.add(key);
        }
        for (let key of keys){
            let value = data.getAll(key)
            value.length > 1 ? lesson[key] = value : lesson[key] = value[0]
        }
        lesson.difficulty = difficulty_map[lesson.difficulty];

        //TODO: Hit the Question API repeatedly (is there a way to just have the endpoint expect an array) and store the idValues of the newly created questions
        let question_Ids = []
        for (let question of lesson.questions){
            let { prompt, answer, incorrect_answers} = question;
            incorrect_answers = incorrect_answers.filter(el => {
                return  el.trim() !== ""
            })
            
            let requestBodyObj = {
                prompt: prompt,
                answer: answer,
                prompt_language: lesson.language,
                incorrect_answers_string: incorrect_answers.join('", "'),
                response_language: 'English', //this should somehow come from user metadata, more advance this can come from language detection
                difficulty: lesson.difficulty,
                type: 'text' ///this needs to come from page metadata
            }
          
            //need to test for presence of values FORM VALIDATION
            let requestBody = requestBodyBuilder(requestBodyObj, 'createQuestion')

            try{
                let resData = await backendCall(requestBody);
                question_Ids.push(resData.data.createQuestion._id)
            }catch (err){
                throw new Error(err)
            }
        }           
        let requestBodyObj ={
            lesson: lesson,
            question_Ids: question_Ids
        }
        let requestBody = requestBodyBuilder(requestBodyObj, 'createLesson')
            
            try{
                await backendCall(requestBody);
                this.setState({
                    modal:true,
                    modalHeader: "Lesson Submitted!",
                    modalText: "You're amazing!"
                })
            }catch (err){
                throw new Error(err)
            }
      }
    
  render() {
    return (
        //TODO: Refactor this form to allow for different headers for different lesson types
      <div>
        <form className="header_form" onSubmit={this.handleSubmit}>
            <FormGroup controlId="formLessonTitle">
                <ControlLabel>Lesson Title</ControlLabel>
                <FormControl type="text" name="title" placeholder="My Lesson" />      
            </FormGroup>
            {' '}
            <FormGroup controlId="formLessonHeader">
                <ControlLabel>Lesson Language</ControlLabel>
                <FormControl componentClass="select" name="language" placeholder="select">
                    <option value="Portuguese">Portuguese</option>
                    <option value="English">English</option>
                </FormControl>
            </FormGroup>
            {' '}
            <FormGroup controlId="formControlsSelect">
                <ControlLabel>Difficulty</ControlLabel>
                <FormControl componentClass="select" name="difficulty" placeholder="select">
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                </FormControl>
            </FormGroup>

            <Button type="submit">Finalize Lesson</Button>
        </form>
        <LessonCreator updateQuestions={this.updateQuestions}></LessonCreator>
        <Modal open={this.state.modal} closeModal={this.closeModal} response={this.state.modalHeader}> 
          <p>{this.state.modalText}</p>
          <Button>All Set</Button>
        </Modal>
      </div>
    )
  }
}
