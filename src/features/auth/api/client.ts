import { apiClient } from '@/lib/api/client'
import type {
  SignInRequest,
  SignInResponse,
  GetUserDataRequest,
  GetUserDataResponse,
  CheckSignInResponse,
} from '../types'

export const authApi = {
  async signIn(credentials: SignInRequest): Promise<SignInResponse> {
    const response = await apiClient.post<SignInResponse>(
      '/Home/Signin',
      credentials
    )
    return response.data
  },

  async checkSignIn(): Promise<CheckSignInResponse> {
    const response =
      await apiClient.post<CheckSignInResponse>('/Home/CheckSignIn')
    return response.data
  },

  async getUserData(siteId: number = 1): Promise<GetUserDataResponse> {
    const response = await apiClient.post<GetUserDataResponse>(
      '/Home/GetUserData',
      { siteId } as GetUserDataRequest
    )
    return response.data
  },
  

  async signOut(): Promise<void> {
    await apiClient.post('/Home/SignOut')
  },
}
