import { createFileRoute } from '@tanstack/react-router'
import { CampaignManagement } from '@/features/campaign-management'

export const Route = createFileRoute('/_authenticated/campaign-management/')({
  component: CampaignManagement,
})
