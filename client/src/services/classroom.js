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

export const createClassroom = async (data) => {
  const response = await httpRequest().post(API.CREATE_CLASSROOM, data)
  return response
}

export const updateClassroom = async (id, dataEdit) => {
  const url = `${API.EDIT_CLASSROOM}/${id}`
  const response = await httpRequest().put(url, dataEdit)

  return response
}

export const getDetailClassroomApi = async (id) => {
  const url = `${API.DETAIL_CLASSROOM}/${id}`

  const { statusCode, data } = await httpRequest().get(url)

  const dataClassroom = data.data
  const { name_classroom, code_classroom, description } = dataClassroom

  const values = {
    name_classroom,
    code_classroom,
    description,
  }

  return { statusCode, values }
}
