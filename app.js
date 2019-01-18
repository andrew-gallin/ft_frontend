const express = require('express');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema/index.js');
const graphQlResolver = require('./graphql/resolvers/index.js');
const isAuth = require('./middleware/is-auth');
const app = express();

//use bodyParser.json() if not on most current version of express
app.use(express.json());

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	//Verifies to browser service accepts requests even though Graphql doesn't handle Options
	if (req.method === 'OPTIONS'){
		return res.sendStatus(200);
	}
	next();
});

app.use(isAuth);

app.use('/graphql', graphqlHttp({
	schema: graphQlSchema,
	rootValue: graphQlResolver,
	graphiql: true
}));

mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@ds247674.mlab.com:47674/fluenttruant`).then(() => {
	app.listen(8000);
}).catch((err) => {
	throw new Error(err);
});
