import type { IAxiosResponse } from '@/lib/types/common'

export interface SignInRequest {
  userName: string
  userPwd: string
}

export interface SignInResponseData {
  user?: AuthUserData
  [key: string]: unknown
}

export type SignInResponse = IAxiosResponse<SignInResponseData>

export interface GetUserDataRequest {
  siteId: number
}

export interface GetUserDataResponseData {
  user?: AuthUserData
  [key: string]: unknown
}

export type GetUserDataResponse = IAxiosResponse<GetUserDataResponseData>

export interface CheckSignInResponseData {
  isSignedIn: boolean
  [key: string]: unknown
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
  [key: string]: unknown
}

export interface GetUserMenuResponseData {
  menu?: MenuItemData[]
  [key: string]: unknown
}

export type GetUserMenuResponse = IAxiosResponse<GetUserMenuResponseData>

export interface AuthUserData {
  accountNo?: string
  email?: string
  userName?: string
  name?: string
  role?: string[]
  roles?: string[]
  permissions?: string[]
  siteId?: number
  [key: string]: unknown
}

export interface AuthUser {
  accountNo: string
  email: string
  userName: string
  name?: string
  roles: string[]
  permissions: string[]
  siteId?: number
}

export interface SignInInput {
  userName: string
  userPwd: string
}

export interface SignInResult {
  token: string
  user: AuthUser
}
