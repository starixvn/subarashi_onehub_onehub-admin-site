import { createFileRoute } from '@tanstack/react-router'
import { AuthProvider } from '@/context/auth-provider'
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'

function AuthenticatedRoute() {
  return (
    <AuthProvider>
      <AuthenticatedLayout />
    </AuthProvider>
  )
}

export const Route = createFileRoute('/_authenticated')({
  component: AuthenticatedRoute,
})
