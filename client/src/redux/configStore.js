import { loadingReducer, sidebarShow, toaster, permissions, modalStatic } from './reducers'
import { combineReducers, createStore } from 'redux'
// root reducer
export const rootReducer = combineReducers({
  loadingReducer,
  sidebarShow,
  toaster,
  permissions,
  modalStatic,
})

export const store = createStore(rootReducer)

export const dispatch = store.dispatch
