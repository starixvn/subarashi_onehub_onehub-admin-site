import { type Table } from '@tanstack/react-table'
import { Pause, Play, Ban, FileText, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { sleep } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { DataTableBulkActions as BulkActionsToolbar } from '@/components/data-table'
import { type Campaign } from '../../data/schema'

type CampaignBulkActionsProps = {
  table: Table<Campaign>
  onDeleteClick: () => void
}

export function CampaignBulkActions({
  table,
  onDeleteClick,
}: CampaignBulkActionsProps) {
  const selectedRows = table.getFilteredSelectedRowModel().rows

  const pausedCount = selectedRows.filter(
    (row) => row.original.status !== 2
  ).length
  const activeCount = selectedRows.filter(
    (row) => row.original.status !== 1
  ).length
  const inactiveCount = selectedRows.filter(
    (row) => row.original.status !== 3
  ).length
  const draftCount = selectedRows.filter(
    (row) => row.original.status !== 0
  ).length

  const handleStatusChange = (status: number, statusName: string) => {
    const affectedCampaigns = selectedRows.filter(
      (row) => row.original.status !== status
    )

    if (affectedCampaigns.length === 0) {
      toast.error(
        `All selected campaigns are already ${statusName.toLowerCase()}`
      )
      return
    }

    toast.promise(sleep(1500), {
      loading: `Updating campaigns to ${statusName}...`,
      success: () => {
        table.resetRowSelection()
        return `Updated ${affectedCampaigns.length} campaign${affectedCampaigns.length > 1 ? 's' : ''} to ${statusName}`
      },
      error: 'Failed to update campaigns',
    })
  }

  return (
    <BulkActionsToolbar table={table} entityName='campaign'>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant='outline'
            size='icon'
            disabled={pausedCount === 0}
            onClick={() => handleStatusChange(2, 'Paused')}
            className='size-8'
            aria-label={`Change to Paused (${pausedCount} affected)`}
            title={`Change to Paused (${pausedCount} affected)`}
          >
            <Pause />
            <span className='sr-only'>Change to Paused</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Change to Paused ({pausedCount} affected)</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant='outline'
            size='icon'
            disabled={activeCount === 0}
            onClick={() => handleStatusChange(1, 'Active')}
            className='size-8'
            aria-label={`Change to Active (${activeCount} affected)`}
            title={`Change to Active (${activeCount} affected)`}
          >
            <Play />
            <span className='sr-only'>Change to Active</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Change to Active ({activeCount} affected)</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant='outline'
            size='icon'
            disabled={inactiveCount === 0}
            onClick={() => handleStatusChange(3, 'Inactive')}
            className='size-8'
            aria-label={`Change to Inactive (${inactiveCount} affected)`}
            title={`Change to Inactive (${inactiveCount} affected)`}
          >
            <Ban />
            <span className='sr-only'>Change to Inactive</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Change to Inactive ({inactiveCount} affected)</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant='outline'
            size='icon'
            disabled={draftCount === 0}
            onClick={() => handleStatusChange(0, 'Draft')}
            className='size-8'
            aria-label={`Change to Draft (${draftCount} affected)`}
            title={`Change to Draft (${draftCount} affected)`}
          >
            <FileText />
            <span className='sr-only'>Change to Draft</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Change to Draft ({draftCount} affected)</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant='destructive'
            size='icon'
            onClick={onDeleteClick}
            className='size-8'
            aria-label='Delete all selected campaigns'
            title='Delete all selected campaigns'
          >
            <Trash2 />
            <span className='sr-only'>Delete all selected campaigns</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Delete all selected campaigns</p>
        </TooltipContent>
      </Tooltip>
    </BulkActionsToolbar>
  )
}
