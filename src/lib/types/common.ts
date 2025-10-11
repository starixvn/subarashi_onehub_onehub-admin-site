export interface IAxiosResponse<T = unknown> {
  errorCode: number
  message?: string
  data?: T
  [key: string]: unknown
}

export interface PaginationParams {
  page: number
  pageSize: number
}

export interface PaginatedResponse<T> {
  data: T[]
  page: number
  pageSize: number
  total: number
  totalPages: number
}
