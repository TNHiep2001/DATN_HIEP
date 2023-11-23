import { STORAGE_KEYS } from '../constants'
import axios from 'axios'
import { END_POINT } from './api'

const axiosInstance = axios.create({
  baseURL: END_POINT,
  headers: {
    Accept: 'Application/json',
    'Content-Type': 'Application/json',
    'Cache-Control': 'no-cache',
    timeout: 30000,
  },
})

export const httpRequest = (options = {}) => {
  const defaultOptions = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem(STORAGE_KEYS.TOKEN),
    },
    ...options,
  }

  return {
    get: async (url, config = {}) => {
      const response = await axiosInstance.get(url, { ...defaultOptions, ...config })
      return {
        data: response.data,
        statusCode: response.status,
      }
    },
    put: async (url, data, config = {}) => {
      const response = await axiosInstance.put(url, data, { ...defaultOptions, ...config })
      return {
        data: response.data,
        statusCode: response.status,
      }
    },
    post: async (url, data, config = {}) => {
      const response = await axiosInstance.post(url, data, { ...defaultOptions, ...config })

      return {
        data: response.data,
        statusCode: response.status,
      }
    },
    delete: async (url, config = {}) => {
      const response = await axiosInstance.delete(url, { ...defaultOptions, ...config })
      return {
        data: response.data,
        statusCode: response.status,
      }
    },
  }
}
