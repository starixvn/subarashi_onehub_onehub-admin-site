import { createFileRoute } from '@tanstack/react-router'
import { LinkManagement } from '@/features/link-generator/link-management'

export const Route = createFileRoute(
  '/_authenticated/link-generator/link-management/'
)({
  component: LinkManagement,
})
