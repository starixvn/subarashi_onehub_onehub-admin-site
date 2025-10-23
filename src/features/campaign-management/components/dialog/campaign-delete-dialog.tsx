'use client'

import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation('campaign-management')
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
          {t('dialog.delete.title')}
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p className='mb-2'>
            {t('dialog.delete.message')}{' '}
            <span className='font-bold'>{currentRow.name}</span>?
            <br />
            {t('dialog.delete.description')}
          </p>

          <Alert variant='destructive'>
            <AlertTitle>{t('dialog.delete.warning')}</AlertTitle>
            <AlertDescription>
              {t('dialog.delete.warningMessage')}
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText={t('dialog.delete.confirm')}
      destructive
    />
  )
}
