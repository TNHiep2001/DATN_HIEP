import { OPEN_TOASTER } from '../types'

/**
 *
 * @param {string} title vd: Success
 * @param {string} message vd: Delete successfully
 * @param {string} type vd: success | warning | danger | info
 * @param {number} duration milisecond: default: 3000ms
 * @returns object
 */
export const openToaster = (title = '', message = '', type = 'info', duration = 3000) => ({
  type: OPEN_TOASTER,
  payload: {
    title,
    message,
    type,
    duration,
  },
})
