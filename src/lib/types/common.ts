export interface IAxiosResponse<T = unknown> {
  errorCode: number
  errorMessage: string
  result: T
}
