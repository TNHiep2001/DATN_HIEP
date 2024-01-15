/* eslint-disable prettier/prettier */
import * as Yup from 'yup'

import { TEXT_SHORT, maxLengthCharacters, textRequired } from 'src/constants'

const textError = {
  new_password: 'Sử dụng từ 8 đến 25 ký tự cho mật khẩu của bạn.',
  email: 'Vui lòng nhập địa chỉ email của bạn theo định dạng đúng.',
  confirm_password: 'Mật khẩu nhập không khớp. Vui lòng thử lại.',
}

export const usersSchema = (id) => {
  return Yup.object({
    last_name: Yup.string()
      .trim()
      .max(TEXT_SHORT, maxLengthCharacters(TEXT_SHORT))
      .required(textRequired),
    first_name: Yup.string()
      .trim()
      .max(TEXT_SHORT, maxLengthCharacters(TEXT_SHORT))
      .required(textRequired),
    email: Yup.string().email(textError.email).required(textRequired),
    password: Yup.string()
      .min(8, textError.new_password)
      .max(25, textError.new_password)
      .required(textRequired),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('password')], textError.confirm_password)
      .when('password', {
        is: (password) => (password ? true : false),
        then: Yup.string().required(textRequired),
        otherwise: Yup.string().notRequired(),
      }),
    role: Yup.object().nullable().required(textRequired),
  })
}
