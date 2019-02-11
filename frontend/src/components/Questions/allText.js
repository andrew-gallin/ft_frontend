import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const style = {
  padding: '3px',
  textAlign: 'center',
}

const buttonStyle = {
  width: '100%',
  height: '100%',
  fontSize: '1.5rem'
}

const itemStyle = {
  paddingBottom: '10px',

}

//All text expects a lesson object prop with an array of possible questions and a prompt
//This Component expects a handler to be passed into trigger correct or incorrect answer clicks
//This component is aware of which is the answer
export class AllText extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         
      }
      this.handleClick = this.handleClick.bind(this)
    }
    
    handleClick(event){
      event.preventDefault()
      event.currentTarget.textContent === this.props.answer ? this.props.handleAnswer(true) : alert('wrong')
    }

  render() {
    return (
      <div>
          <Grid container spacing={24} alignItems="center" justify="center">
            <Grid item xs ={12} style={style}>
                <h1>{this.props.prompt}</h1>
            </Grid>
            <Grid item xs={9} style={itemStyle} >
                <Grid container spacing={24}>
                    {this.props.possibleAnswers.map(possibleAnswer =>
                        <Grid item xs ={6} style={style} key={possibleAnswer}>
                            <Button variant="contained" color="primary"key={possibleAnswer}
                            onClick={this.handleClick} style={buttonStyle}>{possibleAnswer}</Button>
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </Grid>
        
      </div>
    )
  }
}

export default AllText