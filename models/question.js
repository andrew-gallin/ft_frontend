const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	prompt: {
		type: String,
		required: true
	},
	answer: {
		type: String,
		required: true
	},
	incorrectAnswers: [{
		type: String,
	}],
	type: {
		type: String,
		required: true
	},
	promptLanguage: {
		type: String,
		required: true
	},
	responseLanguage: {
		type: String,
		required: true
	},
	tags: [{
		type: String,
	}],
	difficulty: {
		type: Number,
		required: true
	},
	createdOn: {
		type: Date,
		required: true
	}
});

module.exports = mongoose.model('Question', questionSchema);
