import { createFileRoute, redirect } from '@tanstack/react-router'
import { apiClient } from '@/lib/api/client'
import type { CheckSignInResponse } from '@/features/auth/types'
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'

function AuthenticatedRoute() {
  return <AuthenticatedLayout />
}

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ location }) => {
    try {
      const response = await apiClient.post<CheckSignInResponse>('/Home/CheckSignIn')

      if (response.data.errorCode !== 0) {
        throw redirect({
          to: '/sign-in',
          search: {
            redirect: location.href,
          },
        })
      }
    } catch (error) {
      throw redirect({
        to: '/sign-in',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: AuthenticatedRoute,
})
