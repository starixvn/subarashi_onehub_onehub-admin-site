import { type Row } from '@tanstack/react-table'
import { StatusSelect } from '@/components/ui/status-select'
import { useUpdateCampaign } from '../../api/commands'
import { status } from '../../data/data'
import { type Campaign } from '../../data/schema'

export function CampaignStatusCell({ row }: { row: Row<Campaign> }) {
  const updateMutation = useUpdateCampaign()

  const handleStatusChange = (newStatus: string) => {
    updateMutation.mutate({
      id: row.original.code,
      data: { status: Number(newStatus) },
    })
  }

  return (
    <StatusSelect
      value={String(row.original.status)}
      onValueChange={handleStatusChange}
      options={status}
      disabled={updateMutation.isPending}
      size='sm'
    />
  )
}
