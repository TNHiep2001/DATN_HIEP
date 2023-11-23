import { OPEN_TOASTER } from '../types'

const initialState = {
  status: false,
  info: {
    title: '',
    message: '',
    type: 'info',
    duration: 3000,
  },
}

const toaster = (state = initialState, { type, payload }) => {
  switch (type) {
    case OPEN_TOASTER: {
      return { ...state, status: true, info: payload }
    }

    default:
      return state
  }
}
export default toaster

export const toasterSelector = (state) => state.toaster
