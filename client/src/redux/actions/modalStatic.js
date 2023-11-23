import { HIDE_MODAL_STATIC, SET_VISIBLE_MODAL_STATIC } from '../types'

/**
 * @param {object} value có các thuộc tính sau:
 * {
 * visible: boolean,
 * title: string,
 * action: func,
 * nameAction: string
 * }
 * @returns object
 */
export const setVisibleModalStatic = (value) => ({
  type: SET_VISIBLE_MODAL_STATIC,
  payload: value,
})

export const hideModalStatic = () => ({
  type: HIDE_MODAL_STATIC,
})
