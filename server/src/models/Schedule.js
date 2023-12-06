const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

// Định nghĩa schema cho mỗi object trong mảng schedules
const scheduleItemSchema = new Schema({
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
    type: {
      label: {
        type: String,
        required: true,
      },
      value: {
        type: String,
        required: true,
      },
    },
  },
  content_schedule: {
    type: String,
    required: true,
  },
  num_of_lessons: {
    type: String,
    required: true,
  },
  name_teacher: {
    type: String,
    required: true,
  },
  status_schedule: {
    type: {
      label: {
        type: String,
        required: true,
      },
      value: {
        type: String,
        required: true,
      },
    },
  },
});

const Schedule = mongoose.model(
  "Schedule",
  new Schema({
    id: {
      type: ObjectId,
    },

    type: {
      label: {
        type: String,
        required: true,
      },
      value: {
        type: String,
        required: true,
      },
    },

    lecture_content: {
      type: String,
      require: true,
    },

    total_num_lessons: {
      type: String,
      require: true,
    },

    total_credit_points: {
      type: String,
      require: true,
    },

    responsible_teacher: {
      type: String,
      require: true,
    },

    description: {
      type: String,
      require: true,
    },

    schedules: {
      type: [scheduleItemSchema],
      require: true,
    },
  })
);

module.exports = Schedule;
