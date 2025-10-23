import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { getRouteApi } from '@tanstack/react-router'
import { Main } from '@/components/layout/main'
import { CampaignsPrimaryButtons } from './components/campaign-primary-buttons'
import { CampaignsProvider, useCampaigns } from './components/campaign-provider'
import { CampaignDialogs } from './components/dialog/campaign-dialog'
import { CampaignTable } from './components/table/campaign-table'
import { CampaignStatusFilters } from './components/campaign-status-filters'

const route = getRouteApi('/_authenticated/campaign-management/')

function CampaignManagementContent() {
  const { t } = useTranslation('campaign-management')
  const search = route.useSearch()
  const navigate = route.useNavigate()
  const { selectedStatus, campaigns, isLoading } = useCampaigns()

  const filteredCampaigns = useMemo(() => {
    if (selectedStatus === null) {
      return campaigns
    }
    return campaigns.filter((campaign) => campaign.status === selectedStatus)
  }, [selectedStatus, campaigns])

  if (isLoading) {
    return (
      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              {t('page.title')}
            </h2>
            <p className='text-muted-foreground'>{t('page.description')}</p>
          </div>
        </div>
        <div className='flex items-center justify-center py-8'>
          <p className='text-muted-foreground'>{t('page.loading')}</p>
        </div>
      </Main>
    )
  }

  return (
    <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
      <div className='flex flex-wrap items-end justify-between gap-2'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>
            {t('page.title')}
          </h2>
          <p className='text-muted-foreground'>{t('page.description')}</p>
        </div>
        <CampaignsPrimaryButtons />
      </div>
      <CampaignStatusFilters campaigns={campaigns} />
      <CampaignTable
        data={filteredCampaigns}
        search={search}
        navigate={navigate}
      />
    </Main>
  )
}

export function CampaignManagement() {
  return (
    <CampaignsProvider>
      <CampaignManagementContent />
      <CampaignDialogs />
    </CampaignsProvider>
  )
}
