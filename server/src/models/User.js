const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const User = mongoose.model(
  "User",
  new Schema({
    id: {
      type: ObjectId,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  })
);

module.exports = User;
