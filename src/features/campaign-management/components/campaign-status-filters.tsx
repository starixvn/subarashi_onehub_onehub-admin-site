import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  BarChart3,
  CheckCircle2,
  PenLine,
  Pause,
  Trash2,
} from 'lucide-react'
import { StatusFilterCard } from '@/components/ui/status-filter-card'
import { type Campaign } from '../data/schema'
import { useCampaigns } from './campaign-provider'

type CampaignStatusFiltersProps = {
  campaigns: Campaign[]
}

export function CampaignStatusFilters({
  campaigns,
}: CampaignStatusFiltersProps) {
  const { t } = useTranslation('campaign-management')
  const { selectedStatus, setSelectedStatus } = useCampaigns()

  const statusCounts = useMemo(() => {
    return {
      total: campaigns.length,
      active: campaigns.filter((c) => c.status === 1).length,
      draft: campaigns.filter((c) => c.status === 0).length,
      paused: campaigns.filter((c) => c.status === 2).length,
      inactive: campaigns.filter((c) => c.status === 3).length,
    }
  }, [campaigns])

  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-5'>
      <StatusFilterCard
        title={t('statusFilters.total')}
        count={statusCounts.total}
        icon={BarChart3}
        variant='rainbow'
        selected={selectedStatus === null}
        onClick={() => setSelectedStatus(null)}
      />
      <StatusFilterCard
        title={t('statusFilters.active')}
        count={statusCounts.active}
        icon={CheckCircle2}
        variant='success'
        selected={selectedStatus === 1}
        onClick={() => setSelectedStatus(1)}
      />
      <StatusFilterCard
        title={t('statusFilters.draft')}
        count={statusCounts.draft}
        icon={PenLine}
        variant='warning'
        selected={selectedStatus === 0}
        onClick={() => setSelectedStatus(0)}
      />
      <StatusFilterCard
        title={t('statusFilters.paused')}
        count={statusCounts.paused}
        icon={Pause}
        variant='info'
        selected={selectedStatus === 2}
        onClick={() => setSelectedStatus(2)}
      />
      <StatusFilterCard
        title={t('statusFilters.inactive')}
        count={statusCounts.inactive}
        icon={Trash2}
        variant='secondary'
        selected={selectedStatus === 3}
        onClick={() => setSelectedStatus(3)}
      />
    </div>
  )
}
