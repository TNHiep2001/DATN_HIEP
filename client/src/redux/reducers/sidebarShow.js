import { TOGGLE_SIDE_BAR } from '../types'

const initialState = {
  sidebarShow: true,
}

export const sidebarShow = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SIDE_BAR: {
      return { ...state, sidebarShow: !state.sidebarShow }
    }
    default:
      return state
  }
}
