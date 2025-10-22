import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { useGetCampaigns } from '../api/queries'
import { type Campaign } from '../data/schema'

type CampaignsDialogType = 'create' | 'update' | 'delete' | 'import'

type CampaignsContextType = {
  open: CampaignsDialogType | null
  setOpen: (str: CampaignsDialogType | null) => void
  currentRow: Campaign | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Campaign | null>>
  selectedStatus: number | null
  setSelectedStatus: React.Dispatch<React.SetStateAction<number | null>>
  campaigns: Campaign[]
  isLoading: boolean
  isError: boolean
}

const CampaignsContext = React.createContext<CampaignsContextType | null>(null)

export function CampaignsProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useDialogState<CampaignsDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Campaign | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<number | null>(null)

  const { data, isLoading, isError } = useGetCampaigns()

  return (
    <CampaignsContext
      value={{
        open,
        setOpen,
        currentRow,
        setCurrentRow,
        selectedStatus,
        setSelectedStatus,
        campaigns: data?.campaigns ?? [],
        isLoading,
        isError,
      }}
    >
      {children}
    </CampaignsContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCampaigns = () => {
  const campaignsContext = React.useContext(CampaignsContext)

  if (!campaignsContext) {
    throw new Error('useCampaigns has to be used within <TasksContext>')
  }

  return campaignsContext
}
