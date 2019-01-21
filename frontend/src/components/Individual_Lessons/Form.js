import React, { Component } from 'react';
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import './form.css'

import { Carousel } from 'react-bootstrap';
import Text_Question from './text_template/text_question'


export default class LessonForm extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            value: '',
            questions:[]
        };
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
      }
    
  render() {
    return (
      <div>
        <form>
            <FormGroup controlId="formLessonTitle">
                <ControlLabel>Lesson Title</ControlLabel>
                <FormControl type="text" placeholder="My Lesson" />      
            </FormGroup>
            {' '}
            <FormGroup controlId="formLessonHeader">
                <ControlLabel>Lesson Language</ControlLabel>
                <FormControl componentClass="select" placeholder="select">
                    <option value="Portuguese">Portuguese</option>
                    <option value="English">English</option>
                </FormControl>
            </FormGroup>
            {' '}
            <FormGroup controlId="formControlsSelect">
                <ControlLabel>Difficulty</ControlLabel>
                <FormControl componentClass="select" placeholder="select">
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                </FormControl>
            </FormGroup>

            <Button type="submit">Finalize Lesson</Button>
        </form>
        <LessonCreator></LessonCreator>
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
          lessons: []
        };
      }

      componentDidMount(){
          this.setState({lessons: [{}]})
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
        let lessons = this.state.lessons
        lessons[this.state.index] = lesson
        
        this.setState(
            {
                lessons: lessons,
                end: false
            }
        );
        
      }

      handleSelect(selectedIndex, e) {
          console.log(selectedIndex, this.state.lessons.length);
          let index = selectedIndex
          let addLesson = false
          if(this.state.index + 1 === this.state.lessons.length && e.direction === 'next'){
            index = this.state.index
            addLesson = true
          }
          
        this.setState({
          index: index,
          direction: e.direction,
          lessons: addLesson ? this.state.lessons.concat([{}]) : this.state.lessons
        });
      }


  render() {
    const { index, direction, lessons } = this.state;
    console.log(lessons)
    let nextIcon = <span className="glyphicon glyphicon-chevron-right"></span>
    if(index === lessons.length-1){
        nextIcon =<span className="glyphicon glyphicon-plus"></span>
    }
    return (
      <div>
          <Carousel
          activeIndex={index}
          direction={direction}
          onSelect={this.handleSelect}
          //Next Icon should programatically be a + if at the end of the lesson
          nextIcon ={nextIcon}
          >
            {lessons.map(lesson => (
                <Carousel.Item >
                    <Text_Question handleSubmit={this.handleSubmit} />
                </Carousel.Item>
            ))}              
          </Carousel>
        
      </div>
    )
  }
}
