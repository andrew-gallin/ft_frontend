import React, { Component } from 'react';
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import './form.css'

import { Carousel } from 'react-bootstrap';
import textQuestion from './text_template/text_question'

const backendURL = 'http://localhost:8000/graphql'


export default class LessonForm extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleChange = this.handleChange.bind(this);
        this.updateQuestions = this.updateQuestions.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            value: '',
            questions:[]
        };
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
      }
    
    updateQuestions(questions){
        this.setState({
            questions: questions
        })        
    }

    handleSubmit(event){
        event.preventDefault();
        //Gathers form data and builds object where values are arrays if the field names are shared b/w multiple values
        // otherwise it is 1:1 k:v
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
        console.log(lesson)

        //TODO: Hit the Question API repeatedly (is there a way to just have the endpoint expect an array) and store the

        // let requestBody = {
        //     query: `
        //       mutation {
        //         login(email: "${email}", password: "${password}"){
        //           userId
        //           token
        //           tokenExpiration
        //         }
        //       }
        //     `
        //   }
      
        //   if (!this.state.isLogin) {
        //     requestBody ={
        //        query: `
        //          mutation{
        //            createUser(userInput:{email: "${email}", username: "${username}", password: "${password}"}){
        //              _id
        //              email
        //            }
        //          }
        //        `
        //      }
        //   }
      
        //   //send to the backend
        //   fetch(backendURL, {
        //     method: 'POST',
        //     body: JSON.stringify(requestBody),
        //     headers:{
        //       'Content-Type': 'application/json'
        //     }
        //   }).then(res => {
        //     if (res.status !== 200 && res.status !== 201) {
        //       throw new Error('Failed!')
        //     }
        //     return res.json();
        //   })
        //   .then(resData => {
        //     if(resData.data.login.token){
        //       this.context.login(resData.data.login.token, resData.data.login.userId, resData.data.login.tokenExpiration)
        //     }
        //   })
        //   .catch(err => {
        //     console.log(err)
        //   })
        
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
      </div>
    )
  }
}

class LessonCreator extends Component {
    constructor(props, context) {
        super(props, context);
    
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    
        this.state = {
          index: 0,
          direction: null,
          questions: []
        };
      }

      componentDidMount(){
          this.setState({questions: [{}]})
      }

      handleSubmit(event){
        event.preventDefault();
        //Gathers form data and builds object where values are arrays if the field names are shared b/w multiple values
        // otherwise it is 1:1 k:v
        const data = new FormData(event.target);

        let lesson = {}
        let keys = new Set()
        for (let key of data.keys()){
            keys.add(key);
        }
        for (let key of keys){
            let value = data.getAll(key)
            value.length > 1 ? lesson[key] = value : lesson[key] = value[0]
        }
        let questions = this.state.questions
        questions[this.state.index] = lesson
        
        this.setState(
            {
                questions: questions,
                end: false
            }
        );
        this.props.updateQuestions(questions)
      }

      handleSelect(selectedIndex, e) {
          let index = selectedIndex
          let addLesson = false
          if(this.state.index + 1 === this.state.questions.length && e.direction === 'next'){
            index = this.state.index
            addLesson = true
          }
          
        this.setState({
          index: index,
          direction: e.direction,
          questions: addLesson ? this.state.questions.concat([{}]) : this.state.questions
        });
      }

  render() {
    const { index, direction, questions } = this.state;
    let nextIcon = <span className="glyphicon glyphicon-chevron-right"></span>
    //Next Icon is a + if at the end of the lesson
    if(index === questions.length-1){
        nextIcon =<span className="glyphicon glyphicon-plus"></span>
    }
    return (
      <div>
          <Carousel
          activeIndex={index}
          direction={direction}
          onSelect={this.handleSelect}
          nextIcon ={nextIcon}
          >
            {questions.map(lesson => (
                <Carousel.Item >
                    <textQuestion handleSubmit={this.handleSubmit} />
                </Carousel.Item>
            ))}              
          </Carousel>
        
      </div>
    )
  }
}
