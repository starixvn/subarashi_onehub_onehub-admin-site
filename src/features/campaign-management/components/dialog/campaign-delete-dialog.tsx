'use client'

import { AlertTriangle } from 'lucide-react'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { type Campaign } from '../../data/schema'

type CampaignDeleteDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: Campaign
}

export function CampaignDeleteDialog({
  open,
  onOpenChange,
  currentRow,
}: CampaignDeleteDialogProps) {
  const handleDelete = () => {
    onOpenChange(false)
    showSubmittedData(currentRow, 'The following campaign has been deleted:')
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      title={
        <span className='text-destructive'>
          <AlertTriangle
            className='stroke-destructive me-1 inline-block'
            size={18}
          />{' '}
          Delete Campaign
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p className='mb-2'>
            Are you sure you want to delete{' '}
            <span className='font-bold'>{currentRow.name}</span>?
            <br />
            This action cannot be undone. This will permanently delete the
            campaign and all associated data.
          </p>

          <Alert variant='destructive'>
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
              Please be careful, this operation cannot be rolled back.
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText='Delete'
      destructive
    />
  )
}
