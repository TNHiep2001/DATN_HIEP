//Định nghĩa  text message

import { MAX_LOGO_SIZE_NUMBER } from './units'

const textRequired = 'Please enter this field'
const imageRequired = 'Please upload image in this field'
const selectRequired = 'Please choose a store in list'
const minRestaurant = 'A banner must have at least 1 store.'
const maxLengthCharacters = (maxNumber) =>
  `The maximum length of this field is ${maxNumber} characters`
const serverError = "Can't connect server. Something went wrong"

const textErrorSizeLogo = `The size of this image is too big (Maximum is ${MAX_LOGO_SIZE_NUMBER}MB)`
const inputDataIncorrect = 'Input data is incorrect'
const textErrorSelectStoreBanner = 'Store banner has existed'

const timeError = {
  min: 'The end time must be greater than the start time',
  max: 'Business hours are invalid. Please check again. ',
  open: 'Please enter the course time',
  close: 'Please enter the end time of the course',
}

export {
  textRequired,
  imageRequired,
  selectRequired,
  maxLengthCharacters,
  serverError,
  textErrorSizeLogo,
  inputDataIncorrect,
  textErrorSelectStoreBanner,
  minRestaurant,
  timeError,
}
