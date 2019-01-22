const Question = require('../../models/question.js')
const { transformQuestion } = require('./merge')
const User = require('../../models/users');

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
			author: req.userId,
			prompt: args.questionInput.prompt,
			answer: args.questionInput.answer,
			incorrectAnswers: args.questionInput.incorrectAnswers || null,
			type: args.questionInput.type,
			language: args.questionInput.language,
			difficulty: args.questionInput.difficulty,
			tags: args.questionInput.tags || null,
			createdOn: new Date()
		})
		let createdQuestion;
		try {
			const result = await question.save()
			createdQuestion = transformQuestion(result);
			const author = await User.findById(req.userId)
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
