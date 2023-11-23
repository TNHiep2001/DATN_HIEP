import { DISPLAY_LOADING, HIDE_LOADING } from '../types'

const initialState = {
  isLoading: false,
}

export const loadingReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case DISPLAY_LOADING: {
      state.isLoading = true
      return { ...state }
    }
    case HIDE_LOADING: {
      state.isLoading = false
      return { ...state }
    }
    default:
      return state
  }
}
