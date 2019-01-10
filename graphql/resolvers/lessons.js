const Lesson = require('../../models/lessons.js')
const { transformLesson } = require('./merge')

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
  createLesson: async (args) => {
    const lesson = new Lesson({
      title: args.lessonInput.title,
      author: '5c324ab59a7bb9c27c3f8eda',
      description: args.lessonInput.description,
      language: args.lessonInput.language,
      difficulty: args.lessonInput.difficulty,
      createdOn: new Date()
    })
    let createdLesson;
    try{
      const result = await lesson.save()
      createdLesson = transformLesson(result);
      const author = await User.findById('5c324ab59a7bb9c27c3f8eda')
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
