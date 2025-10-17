import { Button } from '@/components/ui/button'
import { Main } from '@/components/layout/main'

export function CampaignManagement() {
  return (
    <Main>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <h1 className='text-2xl font-bold tracking-tight'>
          Campaign Management
        </h1>
        <div className='flex items-center space-x-2'>
          <Button>Create Campaign</Button>
        </div>
      </div>
      <div className='space-y-4'>
        <p className='text-muted-foreground'>
          Manage your marketing campaigns here.
        </p>
      </div>
    </Main>
  )
}
