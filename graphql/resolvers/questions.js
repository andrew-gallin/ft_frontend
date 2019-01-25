const Question = require('../../models/question.js')
const { transformQuestion } = require('./merge')
const User = require('../../models/users');

// const mongoose = require('mongoose')
// const ObjectId = mongoose.Types.ObjectId;

module.exports = {
	questions: () => {
		return Question.find()
			.populate('author')
			.then(questiosn => {
				return questiosn.map(question => {
					return transformQuestion(question);
				})
			}).catch(err => {
				throw err
			})
	},
	createQuestion: async (args, req) => {
		// if (!req.isAuth){
		//   throw new Error('Unauthenticated')
		// }

		//TODO - rewrite this to expect an Array, actually just open up a createBulkQuestions endpoint
		
		const question = new Question({
			///TODO update placeholder id to req.userId
			author: '5c324ab59a7bb9c27c3f8eda',
			prompt: args.questionInput.prompt,
			answer: args.questionInput.answer,
			incorrectAnswers: args.questionInput.incorrectAnswers || null,
			type: args.questionInput.type,
			promptLanguage: args.questionInput.promptLanguage,
			responseLanguage: args.questionInput.promptLanguage,
			difficulty: args.questionInput.difficulty,
			tags: args.questionInput.tags || null,
			lesson: args.questionInput.lesson || null,
			createdOn: new Date()
		})
		let createdQuestion;
		
		try {
			const result = await question.save()
			createdQuestion = transformQuestion(result);
			///TODO update placeholder id to req.userId
			const author = await User.findById('5c324ab59a7bb9c27c3f8eda')
			if (!author) {
				throw new Error('User not found')
			}
			author.createdQuestions.push(question.id)
			await author.save()
			return createdQuestion
		} catch (err) {
			throw err
		}
	}
}
