const Lesson = require('../../models/lessons.js')
const CompletedLesson = require('../../models/completedLesson.js')
const Question = require('../../models/question.js')
const CompletedQuestion = require('../../models/completedQuestion.js')
const { transformLesson, transformCompletedLesson, transformQuestion, transformCompletedQuestion } = require('./merge.js')

module.exports = {
  completedLessons: async (args, req) => {
    if (!req.isAuth){
      throw new Error('Unauthenticated')
    }
    try{
      const completedLessons = await CompletedLesson.find()
      return completedLessons.map(completedLesson => {
        return transformCompletedLesson(completedLesson)
      })
    }catch(err){
      throw err;
    }
  },
  completeLesson: async (args, req) => {
    // if (!req.isAuth){
    //   throw new Error('Unauthenticated')
    // }
    try {
      //if a user has already engaged with a lesson we should update that record
      const fetchedLesson = await Lesson.findOne({_id: args.lessonId})
      let questionData = []      
        let res = await args.questionData.map(async (questionRaw) => {
            let completedQuestion = new CompletedQuestion({
              user: args.userId,
              question: questionRaw.questionId,
              score: questionRaw.score
            })
            let question = await completedQuestion.save()
            
            //questionData.push({question: await transformQuestion(question), ...questionRaw.questionData }) //...question._doc.questionData}
            questionData.push(question)
        })
      const result = await Promise.all(res)
      
      const completeLesson = new CompletedLesson({
        user: args.userId,
        lesson: fetchedLesson,
        score: args.score,
        questionData: questionData//questionData
      })    
      let savedCompleteLesson = await completeLesson.save()      
      
      await savedCompleteLesson.populate('questionData._id')
      
      return transformCompletedLesson(savedCompleteLesson)
    } catch (e) {
      throw e
    }
  },
  resetCompletedLesson: async (args, req) => {
    if (!req.isAuth){
      throw new Error('Unauthenticated')
    }
    try {
      const fetchedCompletedLesson = await CompletedLesson.findById(args.completeLessonId).populate('lesson')
      const lesson = transformLesson(fetchedCompletedLesson.lesson)
      await CompletedLesson.deleteOne({_id: args.completeLessonId})
      return lesson
    } catch (e) {
      throw e
    }
  }
}
