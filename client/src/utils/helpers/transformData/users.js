/* eslint-disable prettier/prettier */
export const transformUserValues = ({ values, idUser }) => {
  const { email, password, confirm_password, first_name, last_name, role } = values

  const formData = new FormData()

  formData.append('users[email]', email)
  formData.append('users[password]', password)
  formData.append('users[confirm_password]', confirm_password)
  formData.append('users[first_name]', first_name)
  formData.append('users[last_name]', last_name)
  formData.append('users[role]', role.value)

  return formData
}
