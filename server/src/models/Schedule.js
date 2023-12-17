const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

// Định nghĩa schema cho mỗi object trong mảng schedules
const scheduleItemSchema = new Schema({
  id: {
    type: ObjectId,
  },
  schedule_date: {
    type: String,
    required: true,
  },
  time_start: {
    type: String,
    required: true,
  },
  time_end: {
    type: String,
    required: true,
  },
  room: {
    type: {},
    required: true,
  },
  content_schedule: {
    type: String,
    required: true,
  },
  num_of_lessons: {
    type: Number,
  },
  name_teacher: {
    type: String,
    required: true,
  },
  status_schedule: {
    type: String,
    required: true,
  },
});

const Schedule = mongoose.model(
  "Schedule",
  new Schema({
    id: {
      type: ObjectId,
    },

    user_create: {
      type: String,
      required: true,
    },

    type_schedule: {
      type: String,
      required: true,
    },

    course_schedule: {
      type: {},
    },

    lecture_content: {
      type: String,
    },

    total_num_lessons: {
      type: Number,
    },

    total_credit_points: {
      type: Number,
    },

    responsible_teacher: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    schedules: {
      type: [scheduleItemSchema],
      required: true,
    },
  })
);

module.exports = Schedule;
