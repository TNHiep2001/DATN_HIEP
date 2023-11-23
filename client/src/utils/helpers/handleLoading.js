import { displayLoadingAction, hideLoadingAction } from 'src/redux/actions'
import { dispatch } from 'src/redux/configStore'

export const showLoading = () => {
  dispatch(displayLoadingAction())
}

export const hideLoading = () => {
  dispatch(hideLoadingAction())
}
