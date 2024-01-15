import { optionsRoleUser } from 'src/constants/users'
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

export const getListUserApi = async () => {
  const response = await httpRequest().get(API.GET_LIST_USER)

  return response
}

export const getListInfoUser = async (data) => {
  let params = {}

  if (data.page) params.page = data.page
  if (data.limit) params.limit = data.limit

  const response = await httpRequest().get(API.GET_LIST_INFO_USER, {
    params,
  })

  return response
}

export const createUser = async (data) => {
  const response = await httpRequest().post(API.CREATE_USER, data)
  return response
}

export const updateUser = async (id, dataEdit) => {
  const url = `${API.EDIT_USER}/${id}`
  const response = await httpRequest().put(url, dataEdit)

  return response
}

export const getDetailUserApi = async (id) => {
  const url = `${API.DETAIL_USER}/${id}`

  const { statusCode, data } = await httpRequest().get(url)

  const dataUser = data.data
  const { email, password, confirm_password, first_name, last_name, role } = dataUser

  const values = {
    email,
    password: password || '',
    confirm_password: confirm_password || '',
    first_name,
    last_name,
    role: optionsRoleUser.find((val) => val.value === role),
  }

  return { statusCode, values }
}
