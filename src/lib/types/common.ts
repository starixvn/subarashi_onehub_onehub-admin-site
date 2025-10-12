export interface IAxiosResponse<T = unknown> {
  data: T
  totalPages?: number
  pageNumber?: number
  rowCount?: number
  errorCode: number
  message: string
  rawErrorCode?: string
  rawMessage?: string
}
