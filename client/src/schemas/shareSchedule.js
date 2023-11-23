/* eslint-disable prettier/prettier */
import * as Yup from 'yup'

const textErrorShareSchedule = {
  share_with_user_error: 'Please choose user',
  name_schedule_share_error: 'Please choose schedule',
}

const { share_with_user_error, name_schedule_share_error } = textErrorShareSchedule

export const shareScheduleSchema = (id) => {
  return Yup.object({
    share_with_user: Yup.object().required(share_with_user_error).nullable(),
    name_schedule_share: Yup.object().required(name_schedule_share_error).nullable(),
  })
}
