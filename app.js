const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql')
const { buildSchema } = require('graphql')

const app = express();

//use bodyParser.json() if not on most current version of express
app.use(express.json())

app.use('/graphql', graphqlHttp({
  schema: buildSchema(`
    type RootQuery {
      lessons: [String!]!

    }

    type RootMutation {
      createLesson(lesson: String) : String
    }

    schema{
      query: RootQuery
      mutation: RootMutation
    }
  `),
  rootValue: {
    lessons: () => {
      return ['Fruits', 'Greetings', 'Ocean']
    },
    createLesson: (args) => {
      const lessonName = args.name;
      return lessonName;
    }
  },
  graphiql: true
}));

app.listen(3000);
