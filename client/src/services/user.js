import API from './api'
import { httpRequest } from './http.service'

export const getInfoUser = async (data) => {
  let params = {}

  if (data.page) params.page = data.page
  if (data.limit) params.limit = data.limit
  if (data.id) params.id = data.id

  const response = await httpRequest().get(API.GET_INFO_USER, {
    params,
  })

  return response
}
