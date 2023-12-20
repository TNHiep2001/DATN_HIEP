/* eslint-disable prettier/prettier */
export const transformShareScheduleValues = ({ values }) => {
  const { id_user, share_with_user, name_schedule_share } = values

  const formData = new FormData()

  formData.append('share_schedule[id_user]', id_user)
  formData.append('share_schedule[share_with_user]', share_with_user.value)
  formData.append('share_schedule[name_schedule_share]', name_schedule_share.value)

  return formData
}
