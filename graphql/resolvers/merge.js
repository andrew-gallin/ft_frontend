const Lesson = require('../../models/lessons.js')
const User = require('../../models/users.js')
const Question = require('../../models/question.js')
const CompletedQuestion = require('../../models/completedQuestion.js')
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

const user = async userId => {
	// console.log(userId);
	
	try {
		const user = await User.findById(userId)
		// console.log(user);
		
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
	let author = await user.bind(this, question.author)
	return {
		...question._doc,
		_id: question.id,
		createdOn: dateToString(question._doc.createdOn),
		author: author
	}
}

const transformCompletedLesson = async completedLesson => {

	let completedQuestions = []
	
	for (let i = 0; i < completedLesson.questionData.length; i++) {
		var currentCompletedQuestion = completedLesson.questionData[i];
		let completedQuestion =  await CompletedQuestion.findById(currentCompletedQuestion._id).populate('user').populate('question')
		
		let transformedCompletedLesson= await transformCompletedQuestion(completedQuestion);
		completedQuestions.push(transformedCompletedLesson)
	}

	return {
		...completedLesson._doc,
		_id: completedLesson.id,
		user: user.bind(this, completedLesson._doc.user),
		lesson: singleLesson.bind(this, completedLesson._doc.lesson),
		questionData: completedQuestions,
		createdAt: dateToString(completedLesson._doc.createdAt),
		updatedAt: dateToString(completedLesson._doc.updatedAt)
	}
}

const transformCompletedQuestion = async completedQuestion =>{
	// console.log(completedQuestion._doc);
	
	let question = await transformQuestion.bind(this, completedQuestion._doc.question)	
	let transformedUser = await user.bind(this, completedQuestion._doc.user._id)
	
	return {
		...completedQuestion._doc,
		_id: completedQuestion.id,
		question: question,
		createdOn: dateToString(completedQuestion.createdAt),
		user: transformedUser
	}
}


exports.transformLesson = transformLesson;
exports.transformQuestion = transformQuestion;
exports.transformCompletedLesson = transformCompletedLesson;
