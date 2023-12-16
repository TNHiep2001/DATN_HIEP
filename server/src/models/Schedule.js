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
    required: true,
  },
  content_schedule: {
    type: String,
    required: true,
  },
  num_of_lessons: {
    type: Number,
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
    required: true,
  },
});

const Schedule = mongoose.model(
  "Schedule",
  new Schema({
    id: {
      type: ObjectId,
    },

    id_user_create: {
      type: String,
      required: true,
    },

    type_schedule: {
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
      required: true,
    },

    course_schedule: {
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
      required: true,
    },

    lecture_content: {
      type: String,
      required: true,
    },

    total_num_lessons: {
      type: Number,
      required: true,
    },

    total_credit_points: {
      type: Number,
      required: true,
    },

    responsible_teacher: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    schedules: {
      type: [scheduleItemSchema],
      required: true,
    },
  })
);

module.exports = Schedule;
