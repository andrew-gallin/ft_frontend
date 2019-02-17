const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const completedQuestionSchema = new Schema ({
  question:{
    type:Schema.Types.ObjectId,
    ref: 'Question'
  },
  user:{
    type:Schema.Types.ObjectId,
    ref:'User'
  },
  score: {
    type: Number
  }
}, {timestamps: true})

module.exports = mongoose.model('CompletedQuestion', completedQuestionSchema)
