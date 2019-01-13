const { buildSchema } = require('graphql')

//TODO: Author should become a user at somepoint or use user ID more likely
module.exports = buildSchema(`
  type CompletedLesson{
    _id: ID!
    lesson: Lesson!
    user: User!
    createdAt: String!
    updatedAt: String!
  }

  type Lesson{
    _id: ID!
    title: String!
    author: User!
    description: String!
    language: String!
    difficulty: Int!
    createdOn: String!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String
    createdLessons: [Lesson!]
  }

  type AuthData{
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }

  input UserInput{
    username: String!
    email: String!
    password: String
  }

  input LessonInput {
    title: String!
    author: String!
    description: String!
    language: String!
    difficulty: Int!
    createdOn: String!
  }

  type RootQuery {
    lessons: [Lesson!]!
    completedLessons: [CompletedLesson!]
    users: [User!]
    login(email: String!, password: String!): AuthData!
  }

  type RootMutation {
    createLesson(lessonInput: LessonInput) : Lesson
    createUser(userInput: UserInput) : User
    completeLesson(lessonId: ID) : CompletedLesson
    resetCompletedLesson(completeLessonId: ID) : Lesson
  }

  schema{
    query: RootQuery
    mutation: RootMutation
  }
`)
