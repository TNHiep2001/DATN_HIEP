const mongoose = require('mongoose')
const { Schema, ObjectId } = mongoose

const Course = mongoose.model(
  'Course',
  new Schema({
    id: {
      type: ObjectId
    },
    name_course: {
      type: String,
      require: true
    },
    code_course: {
      type: String,
      require: true
    },
    description: {
      type: String
    }
  })
)

module.exports = Course
