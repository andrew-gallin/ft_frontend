import React from 'react'

export default (props) => {
    return(

        <form className="lesson-el-form" onSubmit={props.handleSubmit}>
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
                <input type="text" id="incorrect_answer_1" name="incorrect_answer"></input>
            </div>
            <div className="incorrect-answer">
                <label htmlFor="incorrect_answer_2">Incorrect Answer 2:</label>
                <input type="text" id="incorrect_answer_2" name="incorrect_answer"></input>
            </div>
            <div className="incorrect-answer">
                <label htmlFor="incorrect_answer_3">Incorrect Answer 3:</label>
                <input type="text" id="incorrect_answer_3" name="incorrect_answer"></input>
            </div>
            <div className="submit_question">
                <button>Submit Question!</button>
            </div>
        </form>
        
    )
}