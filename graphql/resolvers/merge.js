const Lesson = require('../../models/lessons.js')
const User = require('../../models/users.js')
const Question = require('../../models/question.js')
const { dateToString } = require('../../helpers/date')

const lessons = async (lessonIds) => {
	try {
		const lessons = await Lesson.find({ _id: { $in: lessonIds } })
		return lessons.map(lesson => {
			return transformLesson(lesson)
		})
	} catch (err) {
		throw err
	}
}

const singleLesson = async lessonId => {
	try {
		const fetchedLesson = await Lesson.findById(lessonId)
		return transformLesson(fetchedLesson)
	} catch (e) {
		throw (e)
	}
}

const user = async (userId) => {
	try {
		const user = await User.findById(userId)
		return {
			...user._doc,
			_id: user.id,
			createdLessons: lessons.bind(this, user._doc.createdLessons)
		};
	} catch (err) {
		throw err
	}
}
const transformLesson = async lesson => {
	try{
		let questions = []
		let res = await lesson._doc.questions.map(async questionRaw => {
			let question = await Question.findById(questionRaw._id)
			 questions.push(transformQuestion(question))
		})
		const result = await Promise.all(res)
		
		return {
			...lesson._doc,
			_id: lesson.id,
			createdOn: dateToString(lesson._doc.createdOn),
			author: user.bind(this, lesson.author),
			questions: questions
		} 
	}catch (err) {
		throw err
	}
}

const transformQuestion = async question => {
	//TODO: Activate after converting lessons to an array
	// let lessons = []
	// lesson._doc.questions.forEach(async lessonId => {
	// 	let lesson = await Lesson.findById(lessonId)
	// 	lessons.push(transformQuestion(lesson))
	// })
	return {
		...question._doc,
		_id: question.id,
		createdOn: dateToString(question._doc.createdOn),
		author: user.bind(this, question.author)
	}
}

const transformCompletedLesson = completedLesson => {
	return {
		...completedLesson._doc,
		_id: completedLesson.id,
		user: user.bind(this, completedLesson._doc.user),
		lesson: singleLesson.bind(this, completedLesson._doc.lesson),
		createdAt: dateToString(completedLesson._doc.createdAt),
		updatedAt: dateToString(completedLesson._doc.updatedAt)
	}
}

//exports.user = user;
//exports.lessons = lessons;
//exports.singleLesson = singleLesson;

exports.transformLesson = transformLesson;
exports.transformQuestion = transformQuestion;
exports.transformCompletedLesson = transformCompletedLesson;
