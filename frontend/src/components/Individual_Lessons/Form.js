import React, { Component } from 'react';
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import './form.css'

import { Carousel } from 'react-bootstrap';


export default class LessonForm extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            value: ''
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
                <FormControl type="text" placeholder="My Lesson" />      
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

            <LessonCreator />

            <Button type="submit">Finalize Lesson</Button>
        </form>
      </div>
    )
  }
}


class LessonCreator extends Component {
    constructor(props, context) {
        super(props, context);
    
        this.handleSelect = this.handleSelect.bind(this);
    
        this.state = {
          index: 0,
          direction: null,
          wrap:false
        };
      }
    
      handleSelect(selectedIndex, e) {
        this.setState({
          index: selectedIndex,
          direction: e.direction
        });
      }


  render() {
    const { index, direction, wrap } = this.state;
    return (
      <div>
          <Carousel
          activeIndex={index}
          direction={direction}
          onSelect={this.handleSelect}
          wrap={wrap}
          //Next Icon should programatically be a + if at the end of the lesson
          nextIcon=<span className="glyphicon glyphicon-chevron-right"></span>
          >
            <Carousel.Item >
                <div className="lesson-el-form">
                    <div className="prompt">
                        <label htmlFor="word">Word:</label>
                        <input type="text" id="word" name="question_word"></input>
                    </div>
                    <div className="answer">
                        <label htmlFor="answer">Answer:</label>
                        <input type="text" id="answer" name="answer_word"></input>
                    </div>
                    <div className="incorrect-answer">
                        <label htmlFor="incorrect_answer_1">Incorrect Answer 1:</label>
                        <input type="text" id="incorrect_answer_1" name="incorrect_answer_1"></input>
                    </div>
                    <div className="incorrect-answer">
                        <label htmlFor="incorrect_answer_2">Incorrect Answer 2:</label>
                        <input type="text" id="incorrect_answer_2" name="incorrect_answer_2"></input>
                    </div>
                    <div className="incorrect-answer">
                        <label htmlFor="incorrect_answer_3">Incorrect Answer 3:</label>
                        <input type="text" id="incorrect_answer_3" name="incorrect_answer_3"></input>
                    </div>
                </div>
            </Carousel.Item>
            <Carousel.Item >
                <div className="lesson-el-form">
                    <label htmlFor="word">Word:   </label>
                    <input type="text" id="word" name="question_word"></input>
                    <label htmlFor="answer">Answer:     </label>
                    <input type="text" id="answer" name="answer_word"></input>
                    <label htmlFor="incorrect_answer_1">Incorrect Answer 1:</label>
                    <input type="text" id="incorrect_answer_1" name="incorrect_answer_1"></input>
                    <label htmlFor="incorrect_answer_2">Incorrect Answer 2:</label>
                    <input type="text" id="incorrect_answer_2" name="incorrect_answer_2"></input>
                    <label htmlFor="incorrect_answer_3">Incorrect Answer 3:</label>
                    <input type="text" id="incorrect_answer_3" name="incorrect_answer_3"></input>
                </div>
            </Carousel.Item>
              
          </Carousel>
        
      </div>
    )
  }
}
