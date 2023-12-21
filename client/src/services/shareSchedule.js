/* eslint-disable prettier/prettier */
import API from './api'
import { httpRequest } from './http.service'

export const createShareScheduleApi = async (data) => {
  const response = await httpRequest().post(API.CREATE_SHARE_SCHEDULE, data)
  return response
}

export const getListShareScheduleApi = async (data) => {
  let params = {}

  if (data.page) params.page = data.page
  if (data.limit) params.limit = data.limit
  if (data.idUser) params.idUser = data.idUser

  const response = await httpRequest().get(API.GET_LIST_SHARE_SCHEDULE, {
    params,
  })

  return response
}
