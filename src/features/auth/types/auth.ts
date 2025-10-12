import type { IAxiosResponse } from '@/lib/types/common'

export interface SignInRequest {
  userName: string
  userPwd: string
}

export type SignInResponse = IAxiosResponse<'admin'>

export interface GetUserDataRequest {
  siteId: number
}

export interface GetUserDataResponseData {
  userId: string
  userName: string
  userpwd: string
  isSuper: boolean
  loginTime: string
  status: number
  userType: number
  refId: number
}

export type GetUserDataResponse = IAxiosResponse<GetUserDataResponseData>

export interface CheckSignInResponseData {
  isAuthenticated: boolean
}

export type CheckSignInResponse = IAxiosResponse<CheckSignInResponseData>

export interface GetUserMenuRequest {
  lang: string
  siteId: number
}

export interface MenuItemData {
  id: string
  name: string
  path?: string
  icon?: string
  children?: MenuItemData[]
  permissions?: string[]
}

export interface GetUserMenuResponseData {
  menu?: MenuItemData[]
}

export type GetUserMenuResponse = IAxiosResponse<GetUserMenuResponseData>

export interface AuthUser extends GetUserDataResponseData {
  isAuthenticated: boolean
}

export interface SignInInput {
  userName: string
  userPwd: string
}

export interface SignInResult {
  token: string
  user: AuthUser
}
