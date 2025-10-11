import axios, { type AxiosError, type AxiosResponse } from 'axios'
import type { IAxiosResponse } from '@/lib/types/common'

export interface IAxiosErrorData extends Error {
  status?: number
  statusText?: string
  errorCode?: number
  data?: unknown
}

export const apiClient = axios.create({
  baseURL: '/apiV2',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.response.use(
  (response: AxiosResponse<IAxiosResponse>) => {
    const { data } = response

    if (data?.errorCode && data.errorCode !== 0) {
      const error: IAxiosErrorData = new Error(data.message)
      error.message = data.message || 'An error occurred'
      error.status = response.status
      error.statusText = response.statusText
      error.errorCode = data.errorCode
      error.data = data.data
      return Promise.reject(error)
    }

    return response
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)
