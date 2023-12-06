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
      require: true,
    },
    last_name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      require: true,
    },
  })
);

module.exports = User;
