import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/auth-store'
import type { SignInInput } from '../types'
import { authApi } from './client'
import { authKeys } from './query'

export function useSignIn() {
  const queryClient = useQueryClient()
  const { auth } = useAuthStore()

  return useMutation({
    mutationFn: async (credentials: SignInInput): Promise<void> => {
      const signInResponse = await authApi.signIn(credentials)

      if (signInResponse.errorCode === 0) {
        const userDataResponse = await authApi.getUserData(1)
        auth.setUser({ ...userDataResponse.data, isAuthenticated: true })
        await queryClient.invalidateQueries({ queryKey: authKeys.all() })
      }
    },

    onSuccess: () => toast.success('Login successful'),

    onError: (error: Error) => {
      auth.reset()
      toast.error(error.message)
    },
  })
}

export function useCheckSignIn() {

  return useMutation({
    mutationFn: async () => {
      await authApi.checkSignIn()

      return { isAuthenticated: true }
    },

    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}



export function useSignOut() {
  const queryClient = useQueryClient()
  const { auth } = useAuthStore()

  return useMutation({
    mutationFn: () => authApi.signOut(),

    onSuccess: () => {
      auth.reset()
      queryClient.clear()
      toast.success('Signed out successfully')
    },

    onError: () => {
      auth.reset()
      queryClient.clear()
      toast.error('Sign out failed, but local session cleared')
    },
  })
}
