import { useQuery } from '@tanstack/react-query'
import { campaignApi } from './client'
import type { GetCampaignsRequest } from '../types'

export const campaignKeys = {
  all: ['campaigns'] as const,
  lists: () => [...campaignKeys.all, 'list'] as const,
  list: (params?: GetCampaignsRequest) =>
    [...campaignKeys.lists(), params] as const,
  details: () => [...campaignKeys.all, 'detail'] as const,
  detail: (id: string) => [...campaignKeys.details(), id] as const,
}

export function useGetCampaigns(params?: GetCampaignsRequest) {
  return useQuery({
    queryKey: campaignKeys.list(params),
    queryFn: () => campaignApi.getCampaigns(params),
    select: (data) => data.result,
  })
}

export function useGetCampaign(id: string) {
  return useQuery({
    queryKey: campaignKeys.detail(id),
    queryFn: () => campaignApi.getCampaign(id),
    select: (data) => data.result.campaign,
    enabled: !!id,
  })
}
