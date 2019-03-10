const { buildSchema } = require('graphql');

//TODO: Author should become a user at somepoint or use user ID more likely
module.exports = buildSchema(`
  type CompletedLesson{
    _id: ID!
    lesson: Lesson!
    user: User!
    score: Float
    createdAt: String!
    updatedAt: String!
    questionData: [CompletedQuestion!]
  }

  type CompletedQuestion{
    question: Question!
    user: User!
    score: Float
  }

  type Lesson{
    _id: ID!
    title: String!
    author: User!
    description: String!
    promptLanguage: String
    answerLanguage: String
    language: String
    difficulty: Int!
    createdOn: String!
    questions: [Question!]!
  }

  type Question{
    _id: ID!
    prompt: String!
    answer: String!
    incorrectAnswers: [String]
    author: User!
    lessons: [Lesson!]!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String
    createdLessons: [Lesson!]
    createdQuestions: [Question!]
    spokenLanguageSkill: [LanguageSkill!]
    location: String
    learningLanguageSkill: [LanguageSkill!]
  }

  type LanguageSkill{
    language: String!
    rating: Float!
  }

  type AuthData{
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }

  input LanguageSkillInput{
    language: String!
    rating: Float!
  }

  input UserInput{
    username: String!
    email: String!
    password: String!
    location: String!
    spokenLanguageSkill: [LanguageSkillInput!]
    learningLanguageSkill: [LanguageSkillInput!]
  }

  input CompletedQuestionInput{
    questionId: String!
    score: Float!
  }

  input LessonInput {
    title: String!
    author: String!
    description: String!
    promptLanguage: String!
    answerLanguage: String!
    difficulty: Int!
    questions: [String!]!
  }

  input QuestionInput {
    author: String!
    prompt: String!
    answer: String!
    incorrectAnswers: [String!]
    promptLanguage:String!
    responseLanguage:String!
    type:String!
    difficulty: Int!
    tags: [String!]
    lesson: String
  }

  type RootQuery {
    lessons(promptLanguage: String, answerLanguage: String): [Lesson!]!
    lesson(id: String): Lesson 
    completedLessons: [CompletedLesson!]
    users: [User!]
    user(id: String): User 
    login(email: String!, password: String!): AuthData!
  }

  type RootMutation {
    createLesson(lessonInput: LessonInput) : Lesson
    createQuestion(questionInput: QuestionInput) : Question
    createUser(userInput: UserInput) : User
    completeLesson(lessonId: ID!, userId: ID!, score: Float, questionData: [CompletedQuestionInput]) : CompletedLesson
    resetCompletedLesson(completeLessonId: ID) : Lesson
  }

  schema{
    query: RootQuery
    mutation: RootMutation
  }
`);
