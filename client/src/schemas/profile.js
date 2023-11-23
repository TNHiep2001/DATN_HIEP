import { textRequired } from 'src/constants'
import * as Yup from 'yup'

const textErrorPassword = {
  new_password: 'Use between 8 and 25 characters for your password',
  confirm_password: "The entered passwords don't match. Try again",
}

export const profileSchema = () => {
  return Yup.object({
    new_password: Yup.string()
      .min(8, textErrorPassword.new_password)
      .max(25, textErrorPassword.new_password),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('new_password')], textErrorPassword.confirm_password)
      .when('new_password', {
        is: (new_password) => (new_password ? true : false),
        then: Yup.string().required(textRequired),
        otherwise: Yup.string().notRequired(),
      }),
  })
}
