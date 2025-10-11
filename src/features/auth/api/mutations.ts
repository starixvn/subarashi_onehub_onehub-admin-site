import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useAuthStore, mapUserDataToAuthUser } from '@/stores/auth-store'
import { authApi } from './client'
import { authKeys } from './query'
import type { SignInInput } from '../types'

export function useSignIn() {
  const queryClient = useQueryClient()
  const { auth } = useAuthStore()

  return useMutation({
    mutationFn: async (credentials: SignInInput): Promise<void> => {
      const signInResponse = await authApi.signIn(credentials)

      if (signInResponse.errorCode === 0) {
        const userDataResponse = await authApi.getUserData(1)
        const user = mapUserDataToAuthUser(userDataResponse)
        auth.setUser(user)
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

export function useGetUserData() {
  const queryClient = useQueryClient()
  const { auth } = useAuthStore()

  return useMutation({
    mutationFn: async (siteId: number = 1) => {
      return await authApi.getUserData(siteId)
    },

    onSuccess: (data, siteId) => {
      const user = mapUserDataToAuthUser(data)
      auth.setUser(user)
      queryClient.setQueryData(authKeys.userDataBySiteId(siteId), data)
    },

    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}

export function useCheckSignIn() {
  return useMutation({
    mutationFn: async () => {
      return await authApi.checkSignIn()
    },

    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}

export function useGetUserMenu() {
  return useMutation({
    mutationFn: async ({
      lang = 'en',
      siteId = 1,
    }: {
      lang?: string
      siteId?: number
    }) => {
      return await authApi.getUserMenu(lang, siteId)
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
