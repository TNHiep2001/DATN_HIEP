import mongoose, { Schema, ObjectId } from 'mongoose'

export default mongoose.model(
  'User',
  new Schema({
    id: { type: ObjectId },
    first_name: { type: String, require: true },
    last_name: { type: String, require: true },
    email: { type: String, require: true }
  })
)
