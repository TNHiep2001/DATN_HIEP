import * as Yup from 'yup'
import { maxLengthCharacters } from 'src/constants'

export const messageValidate = {
  password: 'Use between 8 and 25 characters for your password',
  password_confirmation: "The entered passwords don't match. Try again",
  required: 'Please enter this field',
  email: 'Please enter your email address in the correct format',
}

const MAX_LENGTH_EMAIL = 200

const { email, password, password_confirmation, required } = messageValidate

const emailPattern = Yup.string()
  .email(email)
  .required(required)
  .max(MAX_LENGTH_EMAIL, maxLengthCharacters(MAX_LENGTH_EMAIL))

/**
 * Trường hợp là tạo mới tài khoản thì những trường này là bắt buộc
 */
export const createAccount = {
  email: emailPattern,
  password: Yup.string().min(8, password).max(25, password).required(required),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password')], password_confirmation)
    .required(required),
}

/**
 * Trường hợp là edit thì do BE không trả về password nên trường này là không bắt buộc
 * Nhưng trong trường hợp người dùng thay đổi mật khẩu thì xử lý validation
 */
export const editAccount = {
  email: emailPattern,
  password: Yup.string().min(8, password).max(25, password),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password')], password_confirmation)
    .when('password', {
      is: (password) => (password ? true : false),
      then: Yup.string().required(required),
      otherwise: Yup.string().notRequired(),
    }),
}
