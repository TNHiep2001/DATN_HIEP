import { openToaster } from 'src/redux/actions'
import { dispatch } from 'src/redux/configStore'

/**
 *
 * @param {string} methodName Phương thức bao gồm: Update, Delete, Create
 * @param {string} nameEntity tên của thực thể
 */
export const showToastSuccess = (methodName, nameEntity) => {
  const message = `${methodName} ${nameEntity} thành công`

  dispatch(openToaster('Success', message, 'success'))
}
