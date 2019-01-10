const Lesson = require('../../models/lessons.js')
const User = require('../../models/users.js')
const { dateToString } = require('../../helpers/date')

const lessons = async (lessonIds) => {
  try{
    const lessons = await Lesson.find({_id: {$in: lessonIds}})
    return lessons.map(lesson => {
        return transformLesson(lesson)
      })
    } catch (err) {
        throw err
      }
}

const singleLesson = async lessonId => {
  try {
    const fetchedLesson = await Lesson.findById(lessonId)
    return transformLesson(fetchedLesson)
  } catch (e) {
    throw(e)
  }
}

const user = async (userId) => {
  try{
  const user = await User.findById(userId)
    return {
      ...user._doc,
      _id:user.id,
      createdLessons: lessons.bind(this, user._doc.createdLessons)
    };
  }catch(err){
    throw err
  }
}
const transformLesson = lesson => {
  return {
    ...lesson._doc,
    _id:lesson.id,
    createdOn: dateToString(lesson._doc.createdOn),
    author: user.bind(this, lesson.author)
  }
}

const transformCompletedLesson = completedLesson => {
  return {
    ...completedLesson._doc,
    _id: completedLesson.id,
    user: user.bind(this, completedLesson._doc.user),
    lesson: singleLesson.bind(this, completedLesson._doc.lesson),
    createdAt: dateToString(completedLesson._doc.createdAt),
    updatedAt: dateToString(completedLesson._doc.updatedAt)
  }
}

//exports.user = user;
//exports.lessons = lessons;
//exports.singleLesson = singleLesson;

exports.transformLesson = transformLesson;
exports.transformCompletedLesson = transformCompletedLesson;
