import { queryOptions } from '@tanstack/react-query'
import { authApi } from './client'
import type { GetUserDataResponse } from '../types'


export const authKeys = {
  all: () => ['auth'] as const,
  userData: () => [...authKeys.all(), 'userData'] as const,
  userDataBySiteId: (siteId: number) =>
    [...authKeys.userData(), { siteId }] as const,
}


export const getUserDataQueryOptions = (siteId?: number) =>
  queryOptions({
    queryKey: authKeys.userDataBySiteId(siteId || 1),
    queryFn: (): Promise<GetUserDataResponse> => authApi.getUserData(siteId),
    enabled: !!siteId,
    staleTime: 5 * 60 * 1000, 
    gcTime: 10 * 60 * 1000, 
  })
