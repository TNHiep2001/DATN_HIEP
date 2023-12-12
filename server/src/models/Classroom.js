const mongoose = require('mongoose')
const { Schema, ObjectId } = mongoose

const Classroom = mongoose.model(
  'Classroom',
  new Schema({
    id: {
      type: ObjectId
    },
    name_classroom: {
      type: String,
      require: true
    },
    code_classroom: {
      type: String,
      require: true
    },
    description: {
      type: String
    }
  })
)

module.exports = Classroom
