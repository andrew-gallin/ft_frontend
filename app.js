const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql')
const { buildSchema } = require('graphql')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Lesson = require('./models/lessons.js')
const User = require('./models/users.js')

const app = express();

//use bodyParser.json() if not on most current version of express
app.use(express.json())

const lessons = lessonIds => {
  return Lesson.find({_id: {$in: lessonIds}})
}

const user = userId => {
  return User.findById(userId)
  .then(user => {
    return {...user._doc, _id:user.id};
  })
  .catch(err => {
    throw err
  })
}

//TODO: Author should become a user at somepoint or use user ID more likely
app.use('/graphql', graphqlHttp({
  schema: buildSchema(`
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
    }

    type RootMutation {
      createLesson(lessonInput: LessonInput) : Lesson
      createUser(userInput: UserInput) : User
    }

    schema{
      query: RootQuery
      mutation: RootMutation
    }
  `),
  rootValue: {
    lessons: () => {
      return Lesson.find()
      .populate('author')
      .then(lessons => {
        return lessons.map(lesson => {
          return {...lesson._doc,
            _id: lesson._doc._id.toString(),
            author: user.bind(this, lesson._doc.author)};
        })
      }).catch(err =>{
        throw err
      })
    },
    createLesson: (args) => {
      const lesson = new Lesson({
        title: args.lessonInput.title,
        author: '5c2fe0236f2bc3014e8405f0',
        description: args.lessonInput.description,
        language: args.lessonInput.language,
        difficulty: args.lessonInput.difficulty,
        createdOn: new Date()
      })
      let createdLesson;
      return lesson
        .save()
        .then(result =>{
          createdLesson = {...result._doc, _id: lesson._doc._id.toString()};
          return User.findById('5c2fe0236f2bc3014e8405f0')
      }).then(user => {
        if (!user){
          throw new Error('User not found')
        }
        user.createdLessons.push(lesson.id)
        return user.save()
      }).then(result => {
        return createdLesson
      }).catch(err => {
        console.log(err)
        throw err
      });
    },
    createUser: (args) => {
      return User.findOne({email:args.userInput.email})
        .then(user =>{
        if (user){
          throw new Error('User email exists already')
        }
        return bcrypt.hash(args.userInput.password, 12)
      }).then(hashedPassword => {
          const user = new User({
            username: args.userInput.username,
            email: args.userInput.email,
            password: hashedPassword
          });
          return user.save()
        })
        .then(result => {
          return{...result._doc, password:null, _id: result.id}
        })
        .catch(err => {
          throw err
        });
    },
  },
  graphiql: true
}));

mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@ds247674.mlab.com:47674/fluenttruant`).then(() => {
  app.listen(3000);
}).catch((err) => {
  console.log(err);
});
