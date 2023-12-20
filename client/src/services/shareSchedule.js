/* eslint-disable prettier/prettier */
import API from './api'
import { httpRequest } from './http.service'

export const createShareScheduleApi = async (data) => {
  const response = await httpRequest().post(API.CREATE_SHARE_SCHEDULE, data)
  return response
}
