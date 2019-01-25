exports.requestBodyBuilder = (requestBodyParams, type) => {

    let requestBody;
    if (type === "createQuestion"){
        requestBody = {
            query: `
              mutation{
                   createQuestion(questionInput:{author:"5c324ab59a7bb9c27c3f8eda", prompt:"${requestBodyParams.prompt}", answer:"${requestBodyParams.answer}", incorrectAnswers:["${requestBodyParams.incorrect_answers_string}"], promptLanguage:"${requestBodyParams.prompt_language}", responseLanguage:"${requestBodyParams.response_language}", difficulty:${requestBodyParams.difficulty}, type:"${requestBodyParams.type}"}){
                       _id
                       prompt
                       answer
                       incorrectAnswers
                       author{
                           username
                           _id
                       }
                   }
               }
            `
          }

    }

    if (type === ''){
        requestBody = {
            query: `
            mutation{
                createLesson(lessonInput:{title:"${requestBodyParams.lesson.title}", author:"5c324ab59a7bb9c27c3f8eda", description:"I'm hungry", 
                promptLanguage:"${requestBodyParams.lesson.language}",  answerLanguage:"English", difficulty:${requestBodyParams.lesson.difficulty}, questions:["${requestBodyParams.question_Ids.join('", "')}"]}){
                    _id
                    title
                        createdOn
                    author{
                        username
                    }
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
    }

    return requestBody
}