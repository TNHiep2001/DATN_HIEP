const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const ShareSchedule = mongoose.model(
  "ShareSchedule",
  new Schema({
    id: {
      type: ObjectId,
    },
    id_user_share: {
      type: String,
      required: true,
    },
    share_with_user_id: {
      type: String,
      required: true,
    },
    id_schedule_share: {
      type: String,
      required: true,
    },
  })
);

module.exports = ShareSchedule;
