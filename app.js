const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql')
const { buildSchema } = require('graphql')
const mongoose = require('mongoose')

const app = express();

const lessons = [];

//use bodyParser.json() if not on most current version of express
app.use(express.json())

//TODO: Author should become a user at somepoint or use user ID more likely
app.use('/graphql', graphqlHttp({
  schema: buildSchema(`
    type Lesson{
      _id: String!
      title: String!
      author: String!
      description: String!
      language: String!
      difficulty: Int!
      createdOn: String!
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
    }

    type RootMutation {
      createLesson(lessonInput: LessonInput) : Lesson
    }

    schema{
      query: RootQuery
      mutation: RootMutation
    }
  `),
  rootValue: {
    lessons: () => {
      return lessons
    },
    createLesson: (args) => {
      const lesson = {
        _id:  Math.random().toString(),
        title: args.lessonInput.title,
        author: args.lessonInput.author,
        description: args.lessonInput.description,
        language: args.lessonInput.language,
        difficulty: args.lessonInput.difficulty,
        createdOn: new Date().toISOString()
      };
      lessons.push(lesson);
      console.log(lessons)
      return lesson
    }
  },
  graphiql: true
}));

mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@ds247674.mlab.com:47674/fluenttruant`).then(() => {
  app.listen(3000);
}).catch((err) => {
  console.log(err);
});
