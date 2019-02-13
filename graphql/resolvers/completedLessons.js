const Lesson = require('../../models/lessons.js')
const CompletedLesson = require('../../models/completedLesson.js')
const { transformLesson, transformCompletedLesson } = require('./merge.js')

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
      const completeLesson = new CompletedLesson({
        user:args.userId,
        lesson: fetchedLesson
      })
      const result = await completeLesson.save()
      return transformCompletedLesson(result)
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
