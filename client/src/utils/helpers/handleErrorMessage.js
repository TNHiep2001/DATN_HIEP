import { ERROR_STATUS, serverError, UNAUTHORIZED_STATUS } from 'src/constants'
import { openToaster } from 'src/redux/actions'
import { dispatch } from '../../redux/configStore'

/**
 * Kiểm tra phản hồi mà server trả về
 * @param {object} param bao gồm statusCode và message mà server trả về.
 * @returns {Error}
 */
export const checkResponseError = ({ statusCode, message }) => {
  //Trường hợp không tồn tại hoặc các lỗi validate thông thường => trả về message api
  if (ERROR_STATUS.includes(statusCode)) {
    throw new Error(message)
  }
  //Các trường hợp khác ngoài những trường hợp bị cấm hoặc không được phép => trả về lỗi mặc định
  if (!UNAUTHORIZED_STATUS.includes(statusCode)) {
    throw new Error(serverError)
  }
}

/**
 *
 * @param {string | array} message lỗi mà server trả về
 * @returns {string}
 */
export const getMessageError = (message) => {
  if (Array.isArray(message)) {
    return message.join('. ')
  }
  return message
}

export const openNotifyErrorServer = (message) => {
  let msg = message
  if (Array.isArray(message)) msg = message.join('. ')

  dispatch(openToaster('Failed', msg || serverError, 'danger'))
}
