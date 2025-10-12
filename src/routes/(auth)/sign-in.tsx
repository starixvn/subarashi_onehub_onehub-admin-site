import { z } from 'zod'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { apiClient } from '@/lib/api/client'
import type { CheckSignInResponse } from '@/features/auth/types'
import { SignIn } from '@/features/auth/sign-in'

const searchSchema = z.object({
  redirect: z.string().optional(),
})

export const Route = createFileRoute('/(auth)/sign-in')({
  beforeLoad: async () => {
    try {
      const response = await apiClient.post<CheckSignInResponse>('/Home/CheckSignIn')

      if (response.data.errorCode === 0) {
        throw redirect({ to: '/' })
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes('redirect')) {
        throw error
      }
    }
  },
  component: SignIn,
  validateSearch: searchSchema,
})
