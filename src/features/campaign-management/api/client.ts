import { apiClient } from '@/lib/api/client'
import type {
  GetCampaignsRequest,
  GetCampaignsResponse,
  GetCampaignResponse,
  CreateCampaignRequest,
  CreateCampaignResponse,
  UpdateCampaignRequest,
  UpdateCampaignResponse,
  DeleteCampaignResponse,
} from '../types'
import { campaigns } from '../data/campaign'
import type { Campaign } from '../data/schema'

const getMockCampaigns = (params?: GetCampaignsRequest) => {
  let filteredCampaigns = [...campaigns]

  if (params?.search) {
    const searchLower = params.search.toLowerCase()
    filteredCampaigns = filteredCampaigns.filter(
      (campaign) =>
        campaign.name.toLowerCase().includes(searchLower) ||
        campaign.code.toLowerCase().includes(searchLower) ||
        campaign.description.toLowerCase().includes(searchLower)
    )
  }

  if (params?.status !== undefined) {
    filteredCampaigns = filteredCampaigns.filter(
      (campaign) => campaign.status === params.status
    )
  }

  const page = params?.page ?? 1
  const pageSize = params?.pageSize ?? 10
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedCampaigns = filteredCampaigns.slice(startIndex, endIndex)

  return {
    errorCode: 0,
    errorMessage: '',
    result: {
      campaigns: paginatedCampaigns,
      total: filteredCampaigns.length,
    },
  }
}

export const campaignApi = {
  async getCampaigns(
    params?: GetCampaignsRequest
  ): Promise<GetCampaignsResponse> {
    try {
      const response = await apiClient.get<GetCampaignsResponse>(
        '/campaign-management',
        { params }
      )
      return response.data
    } catch {
      return getMockCampaigns(params)
    }
  },

  async getCampaign(id: string): Promise<GetCampaignResponse> {
    try {
      const response = await apiClient.get<GetCampaignResponse>(
        `/campaign-management/${id}`
      )
      return response.data
    } catch {
      const campaign = campaigns.find((c) => c.code === id)

      if (!campaign) {
        return {
          errorCode: 404,
          errorMessage: 'Campaign not found',
          result: { campaign: {} as Campaign },
        }
      }

      return {
        errorCode: 0,
        errorMessage: '',
        result: {
          campaign,
        },
      }
    }
  },

  async createCampaign(
    data: CreateCampaignRequest
  ): Promise<CreateCampaignResponse> {
    try {
      const response = await apiClient.post<CreateCampaignResponse>(
        '/campaign-management',
        data
      )
      return response.data
    } catch {
      const newCampaign: Campaign = {
        code: `CAM_${Date.now()}`,
        name: data.name,
        description: data.description,
        status: data.status,
        createdDate: new Date().toISOString().split('T')[0],
        createdBy: 'Current User',
        modifiedDate: new Date().toISOString().split('T')[0],
        modifiedBy: 'Current User',
      }

      return {
        errorCode: 0,
        errorMessage: '',
        result: {
          campaign: newCampaign,
        },
      }
    }
  },

  async updateCampaign(
    id: string,
    data: UpdateCampaignRequest
  ): Promise<UpdateCampaignResponse> {
    try {
      const response = await apiClient.post<UpdateCampaignResponse>(
        `/campaign-management/${id}`,
        data
      )
      return response.data
    } catch {
      const campaign = campaigns.find((c) => c.code === id)

      if (!campaign) {
        return {
          errorCode: 404,
          errorMessage: 'Campaign not found',
          result: { campaign: {} as Campaign },
        }
      }

      const updatedCampaign: Campaign = {
        ...campaign,
        name: data.name ?? campaign.name,
        description: data.description ?? campaign.description,
        status: data.status ?? campaign.status,
        modifiedDate: new Date().toISOString().split('T')[0],
        modifiedBy: 'Current User',
      }

      return {
        errorCode: 0,
        errorMessage: '',
        result: {
          campaign: updatedCampaign,
        },
      }
    }
  },

  async deleteCampaign(id: string): Promise<DeleteCampaignResponse> {
    try {
      const response = await apiClient.delete<DeleteCampaignResponse>(
        `/campaign-management/${id}`
      )
      return response.data
    } catch {
      const campaign = campaigns.find((c) => c.code === id)

      if (!campaign) {
        return {
          errorCode: 404,
          errorMessage: 'Campaign not found',
          result: { success: false },
        }
      }

      return {
        errorCode: 0,
        errorMessage: '',
        result: {
          success: true,
        },
      }
    }
  },
}
