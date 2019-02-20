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
    
  render() {
      const props = this.props
    return (
        <Formsy className="lesson-el-form" onValidSubmit={props.handleSubmit} onValid={this.enableButton} onInvalid={this.disableButton}>
            <div className="prompt">
                {/* <label htmlFor="word">Word:</label> */}
                <FormsyText type="text" text="Prompt" required  validationError="Prompt is required" id="word" name="Prompt*" placeholder={props.question.prompt || null}></FormsyText>
            </div>
            <div className="answer">
                {/* <label htmlFor="answer">Answer:</label> */}
                <FormsyText type="text" id="answer" required name="Answer*" placeholder={props.question.answer || null}></FormsyText>
            </div>
            <div className="incorrect-answer">
                {/* <label htmlFor="incorrect_answer_1">Incorrect Answer 1:</label> */}
                <FormsyText type="text" id="incorrect_answer_1" name="incorrect_answers" placeholder = {props.question.incorrect_answers[0] || null}></FormsyText>
            </div>
            <div className="incorrect-answer">
                {/* <label htmlFor="incorrect_answer_2">Incorrect Answer 2:</label> */}
                <FormsyText type="text" id="incorrect_answer_2" name="incorrect_answers" placeholder = {props.question.incorrect_answers[1] || null}></FormsyText>
            </div>
            <div className="incorrect-answer">
                {/* <label htmlFor="incorrect_answer_3">Incorrect Answer 3:</label> */}
                <FormsyText type="text" id="incorrect_answer_3" name="incorrect_answers" placeholder = {props.question.incorrect_answers[2] || null}></FormsyText>
            </div>
            <div className="submit_question">
                <Button type="submit" disabled={!this.state.canSubmit}>Submit Question!</Button>
            </div>
      </Formsy>
    )
  }
}

export default (TextQuestion);