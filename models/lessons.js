const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const lessonSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	description: {
		type: String,
		required: true
	},
	promptLanguage: {
		type: String,
		required: true
	},
	answerLanguage: {
		type: String,
		required: true
	},
	difficulty: {
		type: Number,
		required: true
	},
	questions:[{
		type:Schema.Types.ObjectId,
		ref: 'Question',
		required: true
	}],
	createdOn: {
		type: Date,
		required: true
	}
});


module.exports = mongoose.model('Lesson', lessonSchema);
