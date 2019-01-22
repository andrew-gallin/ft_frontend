const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	createdLessons: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Lesson',
		},
	],
	createdQuestions: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Question',
		},
	],
	completedLessons: [
		{
			_id: {
				type: Schema.Types.ObjectId,
				ref: 'Lesson',
			},
			score: {
				type: Number,
			},
		},
	],
});

module.exports = mongoose.model('User', userSchema);
