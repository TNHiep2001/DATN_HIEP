/* eslint-disable prettier/prettier */
export const transformCourseValues = ({ values, idSchedule }) => {
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
  } = values

  const formData = new FormData()

  formData.append('schedule[id_user_create]', id_user_create)
  formData.append('schedule[type_schedule]', type_schedule)
  formData.append('schedule[course_schedule]', course_schedule)
  formData.append('schedule[lecture_content]', lecture_content)
  formData.append('schedule[total_num_lessons]', total_num_lessons)
  formData.append('schedule[total_credit_points]', total_credit_points)
  formData.append('schedule[total_credit_points]', responsible_teacher)
  formData.append('schedule[description]', description)

  schedules.forEach((schedule) => {
    formData.append('schedule[schedule_date]', schedule.schedule_date)
    formData.append('schedule[time_start]', schedule.time_start)
    formData.append('schedule[time_end]', schedule.time_end)
    formData.append('schedule[room]', schedule.room)
    formData.append('schedule[content_schedule]', schedule.content_schedule)
    formData.append('schedule[num_of_lessons]', schedule.num_of_lessons)
    formData.append('schedule[name_teacher]', schedule.name_teacher)
    formData.append('schedule[status_schedule]', schedule.status_schedule)
  })

  return formData
}
