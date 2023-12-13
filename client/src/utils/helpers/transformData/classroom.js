export const transformClassroomValues = ({ values, idClassroom }) => {
  const { name_classroom, code_classroom, description } = values

  const formData = new FormData()

  formData.append('classroom[name_classroom]', name_classroom)
  formData.append('classroom[code_classroom]', code_classroom)
  formData.append('classroom[description]', description)

  return formData
}
