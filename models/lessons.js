const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const lessonSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author:{
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  language:{
    type: String,
    required: true
  },
  difficulty:{
    type: Number,
    required: true
  },
  createdOn:{
    type: Date,
    required: true
  }
});


module.exports = mongoose.model('Lesson', lessonSchema)
