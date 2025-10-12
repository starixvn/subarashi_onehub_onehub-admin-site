import { useNavigate } from '@tanstack/react-router'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { useSignOut } from '@/features/auth/api/mutations'

interface SignOutDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SignOutDialog({ open, onOpenChange }: SignOutDialogProps) {
  const navigate = useNavigate()
  const signOut = useSignOut()

  const handleSignOut = () => {
    signOut.mutate(undefined, {
      onSuccess: () => {
        onOpenChange(false)
        navigate({ to: '/sign-in', replace: true })
      },
    })
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title='Sign out'
      desc='Are you sure you want to sign out? You will need to sign in again to access your account.'
      confirmText='Sign out'
      handleConfirm={handleSignOut}
      className='sm:max-w-sm'
    />
  )
}
