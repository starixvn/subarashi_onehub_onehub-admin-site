import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { campaignApi } from './client'
import { campaignKeys } from './queries'
import type {
  CreateCampaignRequest,
  UpdateCampaignRequest,
} from '../types'

export function useCreateCampaign() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateCampaignRequest) =>
      campaignApi.createCampaign(data),
    onSuccess: (response) => {
      if (response.errorCode === 0) {
        queryClient.invalidateQueries({ queryKey: campaignKeys.lists() })
        toast.success('Campaign created successfully')
      } else {
        toast.error(response.errorMessage || 'Failed to create campaign')
      }
    },
  })
}

export function useUpdateCampaign() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCampaignRequest }) =>
      campaignApi.updateCampaign(id, data),
    onSuccess: (response, variables) => {
      if (response.errorCode === 0) {
        queryClient.invalidateQueries({ queryKey: campaignKeys.lists() })
        queryClient.invalidateQueries({
          queryKey: campaignKeys.detail(variables.id),
        })
        toast.success('Campaign updated successfully')
      } else {
        toast.error(response.errorMessage || 'Failed to update campaign')
      }
    },
  })
}

export function useDeleteCampaign() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => campaignApi.deleteCampaign(id),
    onSuccess: (response, id) => {
      if (response.errorCode === 0) {
        queryClient.invalidateQueries({ queryKey: campaignKeys.lists() })
        queryClient.invalidateQueries({ queryKey: campaignKeys.detail(id) })
        toast.success('Campaign deleted successfully')
      } else {
        toast.error(response.errorMessage || 'Failed to delete campaign')
      }
    },
  })
}
