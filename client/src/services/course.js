/* eslint-disable prettier/prettier */
import API from './api'
import { httpRequest } from './http.service'

export const getListCourse = async (data) => {
  let params = {}

  if (data.page) params.page = data.page
  if (data.limit) params.limit = data.limit

  const response = await httpRequest().get(API.GET_INFO_COURSE, {
    params,
  })

  return response
}

export const createCourse = async (data) => {
  const response = await httpRequest().post(API.CREATE_COURSE, data)
  return response
}

export const updateCourse = async (id, dataEdit) => {
  const url = `${API.EDIT_COURSE}/${id}`
  const response = await httpRequest().put(url, dataEdit)

  return response
}

export const getDetailCourseApi = async (id) => {
  const url = `${API.DETAIL_COURSE}/${id}`

  const { statusCode, data } = await httpRequest().get(url)

  const dataCourse = data.data
  const { name_course, code_course, academic_term, department, major, description } = dataCourse

  const values = {
    name_course,
    code_course,
    academic_term,
    department,
    major,
    description,
  }

  return { statusCode, values }
}

export const getListOptionCourseApi = async (data) => {
  let params = {}

  const response = await httpRequest().get(API.GET_LIST_COURSE, {
    params,
  })

  return response
}
