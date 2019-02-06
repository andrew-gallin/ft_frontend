import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

//All text expects a lesson object prop with an array of possible questions and a prompt
//This Component expects a handler to be passed into trigger correct or incorrect answer clicks
//This component is aware of which is the answer
export class allText extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         
      }
    }
    
  render() {
    return (
      <div>
          <Grid container spacing={24} alignItems="center" justify="center">
            <Grid item xs ={12} className='grid-item'>
                <h1>{this.props.lesson.questions[0].prompt}</h1>
            </Grid>
            <Grid item xs={6} >
                <Grid container spacing={24}>
                    {possibleAnswers.map(possibleAnswer =>
                        <Grid item xs ={6} className='grid-item'>
                            <Button variant="contained" color="primary">{possibleAnswer}</Button>
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </Grid>
        
      </div>
    )
  }
}

export default allText