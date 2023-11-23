import { EMAIL_STORE_CHAIN, NAME_STORE_CHAIN, PHONE_STORE_CHAIN } from 'src/constants/params'
import API from './api'
import { httpRequest } from './http.service'

export const getListStoreChains = async (data) => {
  let params = {}

  if (data.page) params.page = data.page
  if (data.limit) params.limit = data.limit
  if (data.valueSearch.name) params[NAME_STORE_CHAIN] = data?.valueSearch.name
  if (data.valueSearch.phone) params[PHONE_STORE_CHAIN] = data?.valueSearch.phone
  if (data.valueSearch.email) params[EMAIL_STORE_CHAIN] = data?.valueSearch.email

  const response = await httpRequest().get(API.GET_STORE_CHAINS, {
    params,
  })

  return response
}

export const createStoreChain = async (data) => {
  const response = await httpRequest().post(API.GET_STORE_CHAINS, data)
  return response
}

export const updateStoreChain = async ({ id, dataEdit }) => {
  const url = `${API.GET_STORE_CHAINS}/${id}`
  const response = await httpRequest().put(url, dataEdit)

  return response
}

export const getDetailStoreChain = async ({ id }) => {
  const url = `${API.GET_STORE_CHAINS}/${id}`

  const { statusCode, data } = await httpRequest().get(url)

  const dataRestaurant = data.data
  const { name, active, phone, email } = dataRestaurant

  const values = {
    name,
    phone,
    email,
    active,
    password: '',
    password_confirmation: '',
  }

  return { statusCode, values }
}
