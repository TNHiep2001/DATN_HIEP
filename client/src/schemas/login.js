import { textRequired } from 'src/constants'
import * as Yup from 'yup'

const textError = {
  new_password: 'Use between 8 and 25 characters for your password',
  email: 'Please enter your email address in the correct format',
}

export const loginSchema = () => {
  return Yup.object({
    email: Yup.string().email(textError.email).required(textRequired),
    password: Yup.string()
      .min(8, textError.new_password)
      .max(25, textError.new_password)
      .required(textRequired),
  })
}
