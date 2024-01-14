/* eslint-disable prettier/prettier */
import dayjs from 'dayjs'
import { DATE_FORMAT, TIME_FORMAT_ONLY } from 'src/constants'

/* eslint-disable prettier/prettier */
export const transformScheduleValues = ({ values, idSchedule }) => {
  const {
    type_schedule,
    id_user_create,
    course_schedule,
    lecture_content,
    total_num_lessons,
    total_credit_points,
    responsible_teacher,
    description,
    schedules,
    scheduleDestroys,
  } = values

  const formData = new FormData()

  if (idSchedule) formData.append('schedule[id_schedule]', idSchedule)
  formData.append('schedule[id_user_create]', id_user_create)
  formData.append('schedule[type_schedule]', type_schedule?.value || '')
  formData.append('schedule[course_schedule]', course_schedule?.value || '')
  formData.append('schedule[lecture_content]', lecture_content)
  formData.append('schedule[total_num_lessons]', total_num_lessons)
  formData.append('schedule[total_credit_points]', total_credit_points)
  formData.append('schedule[responsible_teacher]', responsible_teacher)
  formData.append('schedule[description]', description)

  // append list schedule
  if (Array.isArray(schedules) && schedules.length > 0) {
    schedules.forEach((item, index) => {
      const {
        schedule_date,
        time_start,
        time_end,
        room,
        content_schedule,
        num_of_lessons,
        name_teacher,
        status_schedule,
        schedule_date_other,
        time_start_other,
        time_end_other,
        room_other,
      } = item

      formData.append(
        `schedule[schedules_attributes][${index}][schedule_date]`,
        dayjs(schedule_date).format(DATE_FORMAT),
      )
      formData.append(
        `schedule[schedules_attributes][${index}][time_start]`,
        dayjs(time_start).format(TIME_FORMAT_ONLY),
      )
      formData.append(
        `schedule[schedules_attributes][${index}][time_end]`,
        dayjs(time_end).format(TIME_FORMAT_ONLY),
      )
      formData.append(`schedule[schedules_attributes][${index}][room]`, room.value)
      formData.append(
        `schedule[schedules_attributes][${index}][content_schedule]`,
        content_schedule,
      )
      formData.append(`schedule[schedules_attributes][${index}][num_of_lessons]`, num_of_lessons)
      formData.append(`schedule[schedules_attributes][${index}][name_teacher]`, name_teacher)
      formData.append(
        `schedule[schedules_attributes][${index}][status_schedule]`,
        status_schedule.value,
      )
      if (schedule_date_other)
        formData.append(
          `schedule[schedules_attributes][${index}][schedule_date_other]`,
          dayjs(schedule_date_other).format(DATE_FORMAT),
        )
      if (time_start_other)
        formData.append(
          `schedule[schedules_attributes][${index}][time_start_other]`,
          dayjs(time_start_other).format(TIME_FORMAT_ONLY),
        )
      if (time_end_other)
        formData.append(
          `schedule[schedules_attributes][${index}][time_end_other]`,
          dayjs(time_end_other).format(TIME_FORMAT_ONLY),
        )
      formData.append(
        `schedule[schedules_attributes][${index}][room_other]`,
        room_other?.value || '',
      )

      // Trong trường hợp edit
      if (idSchedule && item._id) {
        formData.append(`schedule[schedules_attributes][${index}][id]`, item._id)
      }
    })
  }

  // Xử lý xoá schedule
  if (idSchedule && scheduleDestroys.length > 0) {
    scheduleDestroys.forEach((item, index) => {
      const i = index + schedules.length

      formData.append(`schedule[schedules_attributes][${i}][id]`, item._id)
      formData.append(`schedule[schedules_attributes][${i}][_destroy]`, 1)
    })
  }

  return formData
}
