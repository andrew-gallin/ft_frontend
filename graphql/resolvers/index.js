const authResolver = require('./auth')
const lessonsResolver = require('./lessons')
const completedLessonsResolver = require('./completedLessons')
const questionResolver = require('./questions')

const rootResolver = {
  ...authResolver,
  ...lessonsResolver,
  ...completedLessonsResolver,
  ...questionResolver
}

module.exports = rootResolver
