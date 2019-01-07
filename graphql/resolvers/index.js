const bcrypt = require('bcryptjs')

const Lesson = require('../../models/lessons.js')
const User = require('../../models/users.js')

const lessons = async lessonIds => {
  try{
    const lessons = await Lesson.find({_id: {$in: lessonIds}})
    return lessons.map(lesson => {
        return {
          ...lesson._doc,
          _id:lesson.id,
          createdOn: new Date(lesson._doc.createdOn).toISOString(),
          author: user.bind(this, lesson.author)
        }
      })
    } catch (err) {
        throw err
      }
}

const user = async userId => {
  try{
  const user = await User.findById(userId)
    return {
      ...user._doc,
      _id:user.id,
      createdLessons: lessons.bind(this, user._doc.createdLessons)
    };
  }catch(err){
    throw err
  }
}


module.exports = {
  lessons: () => {
    return Lesson.find()
    .populate('author')
    .then(lessons => {
      return lessons.map(lesson => {
        return {...lesson._doc,
          _id: lesson._doc._id.toString(),
          createdOn: new Date(lesson._doc.createdOn).toISOString(),
          author: user.bind(this, lesson._doc.author)};
      })
    }).catch(err =>{
      throw err
    })
  },
  createLesson: async (args) => {
    const lesson = new Lesson({
      title: args.lessonInput.title,
      author: '5c324ab59a7bb9c27c3f8eda',
      description: args.lessonInput.description,
      language: args.lessonInput.language,
      difficulty: args.lessonInput.difficulty,
      createdOn: new Date()
    })
    let createdLesson;
    try{
      const result = await lesson.save()
      createdLesson = {
        ...result._doc,
        _id: lesson._doc._id.toString(),
        createdOn: new Date(lesson._doc.createdOn).toISOString(),
        author: user.bind(this, result._doc.author)
      };
      const author = await User.findById('5c324ab59a7bb9c27c3f8eda')
      if (!author){
        throw new Error('User not found')
      }
      author.createdLessons.push(lesson.id)
      await author.save()
      return createdLesson
    } catch(err){
      throw err
    }
  },
  createUser: async (args) => {
    try{
      const existingUser = await User.findOne({email:args.userInput.email})
      if (existingUser){
        throw new Error('User email exists already')
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12)
      const user = new User({
        username: args.userInput.username,
        email: args.userInput.email,
        password: hashedPassword
      });
      const result  = await user.save()
      return{...result._doc, password:null, _id: result.id}
    }catch(err) {
        throw err
    }
  }
}
