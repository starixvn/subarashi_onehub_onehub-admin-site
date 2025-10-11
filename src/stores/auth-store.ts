import { create } from 'zustand'
import type { GetUserDataResponse, AuthUser } from '@/features/auth/types'

export function mapUserDataToAuthUser(
  response: GetUserDataResponse
): AuthUser {
  const userData = response.data?.user

  return {
    accountNo:
      (userData?.accountNo as string) ||
      (userData?.userName as string) ||
      (userData?.name as string) ||
      'unknown',
    email: (userData?.email as string) || (userData?.userName as string) || '',
    userName:
      (userData?.userName as string) ||
      (userData?.accountNo as string) ||
      'unknown',
    name: userData?.name as string | undefined,
    roles: (userData?.roles as string[]) || (userData?.role as string[]) || ['user'],
    permissions: (userData?.permissions as string[]) || [],
    siteId: userData?.siteId as number | undefined,
  }
}

interface AuthState {
  auth: {
    user: AuthUser | null
    setUser: (user: AuthUser | null) => void
    reset: () => void
  }
}

export const useAuthStore = create<AuthState>()((set) => ({
  auth: {
    user: null,
    setUser: (user) =>
      set((state) => ({ ...state, auth: { ...state.auth, user } })),
    reset: () =>
      set((state) => ({
        ...state,
        auth: { ...state.auth, user: null },
      })),
  },
}))
