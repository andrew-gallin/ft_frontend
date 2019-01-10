const authResolver = require('./auth')
const lessonsResolver = require('./lessons')
const completedLessonsResolver = require('./completedLessons')

const rootResolver = {
  ...authResolver,
  ...lessonsResolver,
  ...completedLessonsResolver
}

module.exports = rootResolver
