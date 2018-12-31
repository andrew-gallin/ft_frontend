const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql')

const app = express();

//use bodyParser.json() if not on most current version of express
app.use(express.json())

app.use('/graphql', graphqlHttp({
  schema: null,
  rootValue: {}
}));

app.listen(3000);
