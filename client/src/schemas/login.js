import { textRequired } from 'src/constants'
import * as Yup from 'yup'

const textError = {
  new_password: 'Sử dụng từ 8 đến 25 ký tự cho mật khẩu của bạn.',
  email: 'Vui lòng nhập địa chỉ email của bạn theo định dạng đúng.',
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
