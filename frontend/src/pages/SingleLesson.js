import React, { Component } from 'react'

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const { backendCall } = require('../helpers/backendCall')

export default class SingleLesson extends Component {
    constructor(props) {
      super(props)
      
      
      this.state = {
        lesson:null,
        isLoading: true,
        error: null
      }
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
            this.setState({lesson: resData.data.lesson, isLoading:false})
          }catch(err) {
            console.log(err)
            this.setState({ error: err, isLoading:false})
          }
    }
  render() {
    const lessonId = this.props.match.params.id;
    const {  lesson, isLoading, error } = this.state;

    if(error){
        return <p>{error.message}</p>;
      }
      
      if (isLoading) {
        return <p>Loading ...</p>;
      }
    
    let possibleAnswers = lesson.questions[0].incorrectAnswers.concat(lesson.questions[0].answer)
    return (
      <div>
        <h1>{lesson.title}</h1>

        <Grid container spacing={24}>
            <Grid item xs ={12} className='grid-item'>
                <h1>{lesson.questions[0].prompt}</h1>
            </Grid>
            {possibleAnswers.map(possibleAnswer =>
                <Grid item xs ={3} className='grid-item'>
                    <Button variant="contained" color="primary">{possibleAnswer}</Button>
                </Grid>
            )}
        </Grid>
      </div>
    )
  }
}