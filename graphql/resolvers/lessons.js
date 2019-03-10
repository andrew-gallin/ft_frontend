const Lesson = require('../../models/lessons.js')
const { transformLesson } = require('./merge')
const User = require('../../models/users');

module.exports = {
	lesson: async (args, req) =>{
		try{
			let lesson = await Lesson.findById(args.id).populate('author').populate('questions')
			
			return transformLesson(lesson)
		}catch (err) {
			throw err
		}		 
	},

	lessons: async (args, req) =>{
		try{
			let findObj = {}
			args.promptLanguage ? findObj.promptLanguage = args.promptLanguage : null
			args.answerLanguage ? findObj.answerLanguage = args.answerLanguage : null

			let lessons = await Lesson.find(findObj).populate('author')
			lessons = lessons.map(lesson => {
				return transformLesson(lesson);
			})
			return lessons
		}catch (err) {
			throw err
		}		 
	},
	createLesson: async (args, req) => {
		// if (!req.isAuth){
		//   throw new Error('Unauthenticated')
		// }
		const lesson = new Lesson({
			title: args.lessonInput.title,
			author: req.userId || "5c324ab59a7bb9c27c3f8eda", 
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
			
			const author = await User.findById(req.userId || "5c324ab59a7bb9c27c3f8eda")
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
