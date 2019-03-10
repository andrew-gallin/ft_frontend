import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import './form.css'
import Modal from '../Questions/Modal'
import LessonCreator from './LessonCreator'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import FormHeader from '../Forms/FormHeader';

const { backendCall } = require('../../helpers/backendCall')
const { requestBodyBuilder } = require('../../helpers/requestBodyBuilder')

const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 2,
    },
  });

class LessonForm extends Component {
    constructor(props, context) {
        super(props, context);

        this.updateQuestions = this.updateQuestions.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.submitValidation = this.submitValidation.bind(this)

        this.state = {
            value: '',
            questions:[],
            modal:false,
            submitDisabled:true,
            errorModal:{
                open:false
            }
        };
    }

    updateQuestions(questions){
        this.setState({
            questions: questions
        })        
    }

    submitValidation(){
        this.setState({
            submitDisabled:false
        })
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };

    closeModal(){
        this.setState({ 
            modal: false,
            errorModal:{
                open:false
            }
        })
      } 

    async handleSubmit(event){
        event.preventDefault();
        if(this.state.questions.length <= 0){
            this.setState({
                errorModal:{
                    open: true,
                    modalHeader: 'Not So Fast!',
                    modalText: 'Please add at least one question to your lesson, but no need to stop at just one ;)'
                }
            })
            return false
        }
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
        lesson.authorID = '5c324ab59a7bb9c27c3f8eda'; //TODO - convert to user token
        
        //TODO: Hit the Question API repeatedly (is there a way to just have the endpoint expect an array) and store the idValues of the newly created questions
        let question_Ids = []
        for (let question of lesson.questions){
            let { prompt, answer, incorrect_answers, type} = question;
            incorrect_answers = incorrect_answers.filter(el => {
                return  el.trim() !== ""
            })
            
            let requestBodyObj = {
                prompt: prompt,
                answer: answer,
                prompt_language: lesson.studentLanguage,
                incorrect_answers_string: incorrect_answers.join('", "'),
                response_language: lesson.teacherLanguage, //this should somehow come from user metadata, more advance this can come from language detection
                difficulty: lesson.difficulty,
                type: type 
            }
          
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
      <div>
        <FormHeader onSubmit={this.handleSubmit} submitValidation={this.submitValidation} submitDisabled={this.state.submitDisabled}/>
        <LessonCreator updateQuestions={this.updateQuestions}></LessonCreator>
        <Modal open={this.state.modal}  closeModal={this.closeModal} response={this.state.modalHeader}> 
          <p>{this.state.modalText}</p>
          <Button>All Set</Button>
        </Modal>
        {/* Error Modal */}
        <Modal open={this.state.errorModal.open}  closeModal={this.closeModal} response={this.state.errorModal.modalHeader}> 
          <p>{this.state.errorModal.modalText}</p>
        </Modal>
      </div>
    )
  }
}

LessonForm.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(LessonForm);