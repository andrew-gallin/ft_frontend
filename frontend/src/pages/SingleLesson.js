import React, { Component } from 'react'

// import Grid from '@material-ui/core/Grid';

import AllText from "../components/Questions/allText";
import QuestionModal from '../components/Questions/QuestionModal'
import ProgressBar from '../components/Individual_Lessons/Progress'
import { Carousel } from 'react-bootstrap';
import '../components/Carousel/carousel.css';
import './SingleLesson.css'
const { backendCall } = require('../helpers/backendCall')
const shuffle = require('knuth-shuffle').knuthShuffle;

export default class SingleLesson extends Component {
    constructor(props) {
      super(props)
      
      this.state = {
        lesson:null,
        isLoading: true,
        error: null,
        modal: false,
        index: 0,
        direction: null,
        accessibleQuestions: [],
        score: 0
      }
      this.handleAnswer = this.handleAnswer.bind(this);
      this.closeModal = this.closeModal.bind(this);
      this.handleSelect = this.handleSelect.bind(this);
      this.handleCorrectAnswer = this.handleCorrectAnswer.bind(this);
      this.lessonComplete = this.lessonComplete.bind(this);
      this.calculateScore = this.calculateScore.bind(this);
    }
    
    async componentDidMount(){
        this.setState({isLoading: true})
        let requestBody = {
          query: `
            query{
              lesson(id: "${this.props.match.params.id}"){
                _id
                title
                difficulty
                questions{
                    _id
                    prompt
                    answer
                    incorrectAnswers
                }
              }
            }
          `
        }
        try{
            let resData = await backendCall(requestBody);
            let lesson = resData.data.lesson
            lesson.questions.forEach((question, index) => {
              lesson.questions[index].possibleAnswers = shuffle(lesson.questions[index].incorrectAnswers.concat(lesson.questions[index].answer))
            });
            this.setState({lesson: lesson, 
                          isLoading:false,
                          accessibleQuestions: [lesson.questions[0]]});
            
          }catch(err) {
            console.log(err)
            this.setState({ error: err, isLoading:false})
          }
    }

    closeModal(){
      this.setState({ modal: false})
      if(this.state.lesson.questions.length !== this.state.index+1){ //This is a test to see if there will be an index to move into
        this.setState({index: this.state.index + 1})
      }
      
    }

    lessonComplete() {
      alert('lesson complete, you\'re the dopest')
    }

    calculateScore(){
      const points = 1 / this.state.lesson.questions.length * 100
      this.setState({
        score: this.state.score + points
      })
      console.log(points);
      
    }

    handleCorrectAnswer() {
    if(this.state.lesson.questions.length === this.state.index+1){ //This means all questions are complete
      setTimeout(this.calculateScore(), 500);
      this.lessonComplete() 
    }else{
        this.setState({
          accessibleQuestions:this.state.accessibleQuestions.concat(this.state.lesson.questions[this.state.index+1]),
          modal:true
        })
        setTimeout(this.calculateScore(), 500);

      } 
      return true
    }
    handleSelect(selectedIndex, e) {
      let index = selectedIndex
      this.setState({
        index: index,
        direction: e.direction,
      });
    }
    handleAnswer(answerCorrect){
      if(answerCorrect){
        this.handleCorrectAnswer()  
      }
    }
  render() {
    //const lessonId = this.props.match.params.id;
    const {  lesson, isLoading, error, index, direction, accessibleQuestions, score } = this.state;
    let nextIcon = <span className="glyphicon glyphicon-chevron-right"></span>

    if(error){
        return <p>{error.message}</p>;
      }
      
      if (isLoading) {
        return <p>Loading ...</p>;
      }

      if(index === accessibleQuestions.length - 1){
        nextIcon = null
    }
    
    return (
      <div className='lesson-page'>
        <h1 className='title'>{lesson.title}</h1>
        <ProgressBar score={score} />
        <Carousel 
          activeIndex={index}
          direction={direction}
          onSelect={this.handleSelect}
          nextIcon={nextIcon}
          wrap={false}>
            {accessibleQuestions.map(question => (
              <Carousel.Item key={question.prompt}>
                <AllText key={question.prompt} possibleAnswers={question.possibleAnswers} prompt={question.prompt} 
                answer={question.answer} handleAnswer={this.handleAnswer} />
              </Carousel.Item>
            ))} 
        </Carousel>
        <QuestionModal open={this.state.modal} closeModal={this.closeModal} response={'Correct'}/>
      </div>
    )
  }
}