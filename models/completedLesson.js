const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const completedLessonSchema = new Schema ({

  lesson:{
    type:Schema.Types.ObjectId,
    ref: 'Lesson'
  },
  user:{
    type:Schema.Types.ObjectId,
    ref:'User'
  },
  questionData:[
    {
      questionId:{
        type:Schema.Types.ObjectId,
        ref: "CompletedQuestion"
      },
      score:{
        type: Number
      }
    }
  ],
  score: {
    type: Number
  }
}, {timestamps: true})

module.exports = mongoose.model('CompletedLesson', completedLessonSchema)
