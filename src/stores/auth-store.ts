import { create } from 'zustand'
import type { AuthUser } from '@/features/auth/types'

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
