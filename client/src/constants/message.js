//Định nghĩa  text message

const textRequired = 'Vui lòng nhập trường này.'
const minSchedule = 'Vui lòng thêm ít nhất 1 lịch trình.'
const maxLengthCharacters = (maxNumber) => `Tối đa của trường này là ${maxNumber} ký tự`
const serverError = 'Không thể kết nối đến máy chủ. Đã xảy ra lỗi'

export { textRequired, maxLengthCharacters, serverError, minSchedule }
