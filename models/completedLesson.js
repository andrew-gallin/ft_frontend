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
  // questionData:[
  //   {
  //     _id:{
  //       type:Schema.Types.ObjectId,
  //       ref: "Question"
  //     },
  //     score:{
  //       type: Number
  //     },
  //     attemps:{
  //       type: Number
  //     }
  //   }
  // ],
  // score: {
  //   type: Number
  // }
}, {timestamps: true})

module.exports = mongoose.model('CompletedLesson', completedLessonSchema)
