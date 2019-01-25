import React from 'react'

export default (props) => {
    return(

        <form className="lesson-el-form" onSubmit={props.handleSubmit}>
            <div className="prompt">
                <label htmlFor="word">Word:</label>
                <input type="text" id="word" name="prompt" placeholder={props.question.prompt || null}></input>
            </div>
            <div className="answer">
                <label htmlFor="answer">Answer:</label>
                <input type="text" id="answer" name="answer" placeholder={props.question.answer || null}></input>
            </div>
            <div className="incorrect-answer">
                <label htmlFor="incorrect_answer_1">Incorrect Answer 1:</label>
                <input type="text" id="incorrect_answer_1" name="incorrect_answers" placeholder = {props.question.incorrect_answers[0] || null}></input>
            </div>
            <div className="incorrect-answer">
                <label htmlFor="incorrect_answer_2">Incorrect Answer 2:</label>
                <input type="text" id="incorrect_answer_2" name="incorrect_answers" placeholder = {props.question.incorrect_answers[1] || null}></input>
            </div>
            <div className="incorrect-answer">
                <label htmlFor="incorrect_answer_3">Incorrect Answer 3:</label>
                <input type="text" id="incorrect_answer_3" name="incorrect_answers" placeholder = {props.question.incorrect_answers[2] || null}></input>
            </div>
            <div className="submit_question">
                <button>Submit Question!</button>
            </div>
        </form>
        
    )
}