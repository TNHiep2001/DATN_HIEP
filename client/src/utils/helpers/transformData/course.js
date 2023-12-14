/* eslint-disable prettier/prettier */
export const transformCourseValues = ({ values, idCourse }) => {
  const { name_course, code_course, academic_term, department, major, description } = values

  const formData = new FormData()

  formData.append('course[name_course]', name_course)
  formData.append('course[code_course]', code_course)
  formData.append('course[academic_term]', academic_term)
  formData.append('course[department]', department)
  formData.append('course[major]', major)
  formData.append('course[description]', description)

  return formData
}
