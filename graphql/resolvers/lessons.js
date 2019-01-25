const Lesson = require('../../models/lessons.js')
const { transformLesson } = require('./merge')
const User = require('../../models/users');

// const mongoose = require('mongoose')
// const ObjectId = mongoose.Types.ObjectId;

module.exports = {
	lessons: () => {
		return Lesson.find()
			.populate('author')
			.then(lessons => {
				return lessons.map(lesson => {
					return transformLesson(lesson);
				})
			}).catch(err => {
				throw err
			})
	},
	createLesson: async (args, req) => {
		// if (!req.isAuth){
		//   throw new Error('Unauthenticated')
		// }
		const lesson = new Lesson({
			title: args.lessonInput.title,
			author: "5c324ab59a7bb9c27c3f8eda", ///req.userId,
			description: args.lessonInput.description,
			promptLanguage: args.lessonInput.promptLanguage,
			answerLanguage: args.lessonInput.answerLanguage,
			difficulty: args.lessonInput.difficulty,
			questions: args.lessonInput.questions,
			createdOn: new Date()
		})
		let createdLesson;
		try {
			const result = await lesson.save()
			createdLesson = transformLesson(result);
			console.log(createdLesson);
			
			const author = await User.findById("5c324ab59a7bb9c27c3f8eda")//req.userId)
			if (!author) {
				throw new Error('User not found')
			}
			author.createdLessons.push(lesson.id)
			await author.save()
			return createdLesson
		} catch (err) {
			throw err
		}
	}
}
