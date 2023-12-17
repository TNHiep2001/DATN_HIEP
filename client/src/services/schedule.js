/* eslint-disable prettier/prettier */
import API from './api'
import { httpRequest } from './http.service'

export const createSchedule = async (data) => {
  const response = await httpRequest().post(API.CREATE_SCHEDULE, data)
  return response
}

export const getListSchedule = async (data) => {
  let params = {}

  if (data.page) params.page = data.page
  if (data.limit) params.limit = data.limit

  const response = await httpRequest().get(API.GET_INFO_SCHEDULE, {
    params,
  })

  return response
}
