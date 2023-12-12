/* eslint-disable prettier/prettier */
import API from './api'
import { httpRequest } from './http.service'

export const getListClassroom = async (data) => {
  let params = {}

  if (data.page) params.page = data.page
  if (data.limit) params.limit = data.limit

  const response = await httpRequest().get(API.GET_INFO_CLASSROOM, {
    params,
  })

  return response
}
