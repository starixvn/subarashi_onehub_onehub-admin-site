import { createFileRoute } from '@tanstack/react-router'
import { ComponentManagement } from '@/features/link-generator/component-management'

export const Route = createFileRoute(
  '/_authenticated/link-generator/component-management/'
)({
  component: ComponentManagement,
})
