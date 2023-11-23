import { HIDE_MODAL_STATIC, SET_VISIBLE_MODAL_STATIC } from '../types'

const initialState = {
  values: {
    title: '',
    visible: false,
    action: () => {},
    nameAction: '',
  },
}

const modalStatic = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_VISIBLE_MODAL_STATIC:
      return { ...state, values: payload }
    case HIDE_MODAL_STATIC: {
      const updatedValues = { ...state.values, visible: false }
      return { values: updatedValues }
    }
    default:
      return state
  }
}
export default modalStatic
