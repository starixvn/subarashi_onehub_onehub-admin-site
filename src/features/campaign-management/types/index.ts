import type { IAxiosResponse } from '@/lib/types/common'
import type { Campaign } from '../data/schema'

export interface GetCampaignsRequest {
  search?: string
  status?: number
  page?: number
  pageSize?: number
}

export interface GetCampaignsResponseData {
  campaigns: Campaign[]
  total: number
}

export type GetCampaignsResponse = IAxiosResponse<GetCampaignsResponseData>

export interface GetCampaignResponseData {
  campaign: Campaign
}

export type GetCampaignResponse = IAxiosResponse<GetCampaignResponseData>

export interface CreateCampaignRequest {
  name: string
  description: string
  status: number
}

export interface CreateCampaignResponseData {
  campaign: Campaign
}

export type CreateCampaignResponse = IAxiosResponse<CreateCampaignResponseData>

export interface UpdateCampaignRequest {
  name?: string
  description?: string
  status?: number
}

export interface UpdateCampaignResponseData {
  campaign: Campaign
}

export type UpdateCampaignResponse = IAxiosResponse<UpdateCampaignResponseData>

export interface DeleteCampaignResponseData {
  success: boolean
}

export type DeleteCampaignResponse = IAxiosResponse<DeleteCampaignResponseData>
