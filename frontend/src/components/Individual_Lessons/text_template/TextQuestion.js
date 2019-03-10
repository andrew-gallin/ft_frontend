import React, { Component } from 'react'
import Formsy from 'formsy-react';
import FormsyText from './FormsyText';
import Button from '@material-ui/core/Button';
  
export class TextQuestion extends Component {
    constructor(props) {
        super(props);
        this.disableButton = this.disableButton.bind(this);
        this.enableButton = this.enableButton.bind(this);
        this.state = { canSubmit: false };
      }
     
      disableButton() {
        this.setState({ canSubmit: false });
      }
     
      enableButton() {
        this.setState({ canSubmit: true });
      }
      mapInputs(inputs) {
        return {
          'prompt': inputs.prompt,
          'answer': inputs.answer,
          'incorrect_answers': [inputs.incorrect_answer1, inputs.incorrect_answer2, inputs.incorrect_answer3],
          'type': 'text'
        };
      }
    
  render() {
      const props = this.props
      
    return (
        <Formsy className="lesson-el-form" id="text" mapping={this.mapInputs} onValidSubmit={props.handleSubmit} 
        onValid={this.enableButton} onInvalid={this.disableButton}>
            <div className="prompt">
                <FormsyText type="text" text="Prompt" required  label= "Prompt*" validationError="Prompt is required" id="word" name="prompt" value={props.question.prompt || null}></FormsyText>
            </div>
            <div className="answer">
                <FormsyText type="text" id="answer" required label= "Answer*" name="answer" value={props.question.answer || null}></FormsyText>
            </div>
            <div className="incorrect-answer">
                <FormsyText type="text" id="incorrect_answer_1" label= "Wrong Answer" name="incorrect_answer1" value = {props.question.incorrect_answers[0] || null}></FormsyText>
            </div>
            <div className="incorrect-answer">
                <FormsyText type="text" id="incorrect_answer_2" label= "Wrong Answer" name="incorrect_answer2" value = {props.question.incorrect_answers[1] || null}></FormsyText>
            </div>
            <div className="incorrect-answer">
                <FormsyText type="text" id="incorrect_answer_3" label= "Wrong Answer" name="incorrect_answer3" value = {props.question.incorrect_answers[2] || null}></FormsyText>
            </div>
            <div className="submit_question">
                <Button type="submit" variant="contained" color="primary" disabled={!this.state.canSubmit}>Submit Question!</Button>
            </div>
      </Formsy>
    )
  }
}

export default (TextQuestion);