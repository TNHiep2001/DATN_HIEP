const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const Classroom = mongoose.model(
  "Classroom",
  new Schema({
    id: {
      type: ObjectId,
    },
    name_classroom: {
      type: String,
      required: true,
    },
    code_classroom: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
  })
);

module.exports = Classroom;
