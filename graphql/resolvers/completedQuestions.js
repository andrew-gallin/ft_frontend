const Lesson = require('../../models/lessons.js')
const CompletedLesson = require('../../models/completedLesson.js')
const Question = require('../../models/question.js')
const CompletedQuestion = require('../../models/completedQuestion.js')
const { transformLesson, transformCompletedLesson, transformQuestion, transformCompletedQuestion } = require('./merge.js')

module.exports = {
    completedQuestions: async (args, req) => {
      if (!req.isAuth){
        throw new Error('Unauthenticated')
      }
      try{
        const completedQuestions = await CompletedQuestion.find()
        return completedQuestions.map(completedQuestion => {
          return transformCompletedQuestion(completedQuestion)
        })
      }catch(err){
        throw err;
      }
    },
    completeQuestion: async (args, req) => {
        // if (!req.isAuth){
        //   throw new Error('Unauthenticated')
        // }
        try{
            const completeQuestion = new CompletedQuestion({
                question:  args.questionId,
                user: args.userId,
                score: args.score
            })
        }catch (e){
            throw e
        }
    }