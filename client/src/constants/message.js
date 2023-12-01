//Định nghĩa  text message

const textRequired = 'Vui lòng nhập trường này.'
const minSchedule = 'Vui lòng thêm ít nhất 1 lịch trình.'
const maxLengthCharacters = (maxNumber) => `Tối đa của trường này là ${maxNumber} ký tự`
const serverError = "Can't connect server. Something went wrong"

const timeError = {
  min: 'The end time must be greater than the start time',
  max: 'Business hours are invalid. Please check again. ',
  open: 'Please enter the course time',
  close: 'Please enter the end time of the course',
}

export { textRequired, maxLengthCharacters, serverError, minSchedule, timeError }
