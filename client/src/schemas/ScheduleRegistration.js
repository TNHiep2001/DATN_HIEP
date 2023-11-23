import * as Yup from 'yup'

import { maxLengthCharacters, textRequired } from 'src/constants'

const MAX_SCHEDULE_REGISTRATION = 255
const MAX_DESCRIPTION = 1024

const textErrorScheduleRegistration = {
  type_error: 'Please choose type schedule',
  startDate: 'Please enter time start schedule',
  endDate: 'Please enter time close schedule',
  scheduleDate: 'Please choose schedule date',
  room_error: 'Please choose class room',
  course_error: 'Please choose course',
  schedule_day_error: 'Please choose schedule day',
  status_error: 'Please choose status',
}

const {
  startDate,
  endDate,
  room_error,
  course_error,
  type_error,
  scheduleDate,
  schedule_day_error,
  status_error,
} = textErrorScheduleRegistration

export const scheduleRegistrationSchema = (id) => {
  return Yup.object({
    type: Yup.object().required(type_error).nullable(),
    time_start: Yup.string().required(startDate),
    time_end: Yup.string().required(endDate),
    schedule_date: Yup.string().required(scheduleDate),
    schedule_day: Yup.object().required(schedule_day_error).nullable(),
    lecture_content: Yup.string()
      .trim()
      .max(MAX_SCHEDULE_REGISTRATION, maxLengthCharacters(MAX_SCHEDULE_REGISTRATION))
      .required(textRequired),
    description: Yup.string().trim().max(MAX_DESCRIPTION, maxLengthCharacters(MAX_DESCRIPTION)),
    room: Yup.object().required(room_error).nullable(),
    course: Yup.object().required(course_error).nullable(),
    status: Yup.object().required(status_error).nullable(),
  })
}
