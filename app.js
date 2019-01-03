const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql')
const { buildSchema } = require('graphql')
const mongoose = require('mongoose')

const Lesson = require('./models/lessons.js')

const app = express();

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
      return Lesson.find().then(lessons => {
        return lessons.map(lesson => {
          return { ...lesson._doc, _id: lesson._doc._id.toString()};
        })
      }).catch(err =>{
        throw err
      })
    },
    createLesson: (args) => {
      const lesson = new Lesson({
        title: args.lessonInput.title,
        author: args.lessonInput.author,
        description: args.lessonInput.description,
        language: args.lessonInput.language,
        difficulty: args.lessonInput.difficulty,
        createdOn: new Date()
      })
      return lesson
        .save()
        .then(result =>{
          return {...result._doc, _id: lesson._doc._id.toString()};
      }).catch(err => {
        console.log(err)
        throw err
      });
    }
  },
  graphiql: true
}));

mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@ds247674.mlab.com:47674/fluenttruant`).then(() => {
  app.listen(3000);
}).catch((err) => {
  console.log(err);
});
