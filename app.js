const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql')
const mongoose = require('mongoose')

const graphQlSchema = require('./graphql/schema/index.js')
const graphQlResolver = require('./graphql/resolvers/index.js')
const isAuth = require('./middleware/is-auth');
const app = express();

//use bodyParser.json() if not on most current version of express
app.use(express.json())

app.use(isAuth)

app.use('/graphql', graphqlHttp({
  schema: graphQlSchema,
  rootValue: graphQlResolver,
  graphiql: true
}));

mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@ds247674.mlab.com:47674/fluenttruant`).then(() => {
  app.listen(3000);
}).catch((err) => {
  console.log(err);
});
