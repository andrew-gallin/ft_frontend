const Lesson = require('../../models/lessons.js')
const { transformLesson } = require('./merge')
const User = require('../../models/users');

module.exports = {
  lessons: () => {
    return Lesson.find()
    .populate('author')
    .then(lessons => {
      return lessons.map(lesson => {
        return transformLesson(lesson);
      })
    }).catch(err =>{
      throw err
    })
  },
  createLesson: async (args, req) => {
    // if (!req.isAuth){
    //   throw new Error('Unauthenticated')
    // }
    const lesson = new Lesson({
      title: args.lessonInput.title,
      author: req.userId,
      description: args.lessonInput.description,
      language: args.lessonInput.language,
      difficulty: args.lessonInput.difficulty,
      createdOn: new Date()
    })
    let createdLesson;
    try{
      const result = await lesson.save()
      createdLesson = transformLesson(result);
      const author = await User.findById(req.userId)
      if (!author){
        throw new Error('User not found')
      }
      author.createdLessons.push(lesson.id)
      await author.save()
      return createdLesson
    } catch(err){
      throw err
    }
  }
}
