import { SET_CURRENT_PERMISSIONS } from '../types'

const initialState = {
  current_permissions: [],
}

const permissions = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CURRENT_PERMISSIONS: {
      return { ...state, current_permissions: payload }
    }
    default:
      return state
  }
}
export default permissions
