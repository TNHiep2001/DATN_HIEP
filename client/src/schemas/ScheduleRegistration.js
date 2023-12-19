import * as Yup from 'yup'

import {
  TEXT_LONG,
  TEXT_MEDIUM,
  TEXT_SHORT,
  maxLengthCharacters,
  minSchedule,
  textRequired,
} from 'src/constants'

const MIN_NUM_OF_LESSONS = 45
const MAX_NUM_OF_LESSONS = 60
const MIN_CREDIT_POINTS = 2
const MAX_CREDIT_POINTS = 7
const MIN_NUMBER = 1

const textErrorScheduleRegistration = {
  type_error: 'Vui lòng chọn kiểu lịch trình',
  course_schedule_error: 'Vui lòng chọn môn học',
  num_lessons_error: `Số tiết học nằm trong khoảng ${MIN_NUM_OF_LESSONS} đến ${MAX_NUM_OF_LESSONS} tiết học`,
  credit_points_error: `Số tín chỉ nằm trong khoảng ${MIN_CREDIT_POINTS} đến ${MAX_CREDIT_POINTS} tín chỉ`,
  schedule_date_error: 'Vui lòng chọn thời gian lịch trình',
  start_time_error: 'Vui lòng chọn thời gian bắt đầu',
  end_time_error: 'Vui lòng chọn thời gian kết thúc',
  room_error: 'Vui lòng chọn giảng đường',
  min_num_lessons: 'Số tiết phải lớn hơn 0',
  status_error: 'Vui lòng chọn trạng thái lịch trình',
}

const {
  type_error,
  course_schedule_error,
  num_lessons_error,
  credit_points_error,
  schedule_date_error,
  start_time_error,
  end_time_error,
  room_error,
  min_num_lessons,
  status_error,
} = textErrorScheduleRegistration

export const scheduleRegistrationSchema = (id) => {
  return Yup.object({
    type_schedule: Yup.object().required(type_error).nullable(),
    lecture_content: Yup.string().when('type_schedule', {
      is: (type) => type && type.value === 'evtType',
      then: Yup.string()
        .trim()
        .max(TEXT_MEDIUM, maxLengthCharacters(TEXT_MEDIUM))
        .required(textRequired),
      otherwise: Yup.string().trim().max(TEXT_MEDIUM, maxLengthCharacters(TEXT_MEDIUM)),
    }),
    course_schedule: Yup.object().when('type_schedule', {
      is: (type) => type && type.value === 'eduType',
      then: Yup.object().required(course_schedule_error).nullable(),
      otherwise: Yup.object().nullable(),
    }),
    total_num_lessons: Yup.number().when('type_schedule', {
      is: (type) => type && type.value === 'eduType',
      then: Yup.number()
        .min(MIN_NUM_OF_LESSONS, num_lessons_error)
        .max(MAX_NUM_OF_LESSONS, num_lessons_error)
        .required(textRequired),
      otherwise: Yup.number(),
    }),
    total_credit_points: Yup.number().when('type_schedule', {
      is: (type) => type && type.value === 'eduType',
      then: Yup.number()
        .min(MIN_CREDIT_POINTS, credit_points_error)
        .max(MAX_CREDIT_POINTS, credit_points_error)
        .required(textRequired),
      otherwise: Yup.number(),
    }),
    responsible_teacher: Yup.string()
      .trim()
      .max(TEXT_SHORT, maxLengthCharacters(TEXT_SHORT))
      .required(textRequired),
    description: Yup.string().trim().max(TEXT_LONG, maxLengthCharacters(TEXT_LONG)),
    schedules: Yup.array()
      .min(MIN_NUMBER, minSchedule)
      .of(
        Yup.object().shape({
          schedule_date: Yup.object().required(schedule_date_error).nullable(),
          time_start: Yup.object().required(start_time_error).nullable(),
          time_end: Yup.object().required(end_time_error).nullable(),
          room: Yup.object().required(room_error).nullable(),
          content_schedule: Yup.string()
            .trim()
            .max(TEXT_MEDIUM, maxLengthCharacters(TEXT_MEDIUM))
            .required(textRequired),
          num_of_lessons: Yup.number().when('type_schedule', {
            is: (type) => type && type.value === 'eduType',
            then: Yup.number().min(MIN_NUMBER, min_num_lessons).required(textRequired),
            otherwise: Yup.number(),
          }),
          name_teacher: Yup.string()
            .trim()
            .max(TEXT_SHORT, maxLengthCharacters(TEXT_SHORT))
            .required(textRequired),
          status_schedule: Yup.object().required(status_error).nullable(),
        }),
      )
      .required(),
  })
}
