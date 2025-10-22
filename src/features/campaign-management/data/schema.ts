import { z } from 'zod'

export const campaignSchema = z.object({
  code: z.string(),
  name: z.string(),
  description: z.string(),
  status: z.number(),
  createdDate: z.string(),
  createdBy: z.string(),
  modifiedDate: z.string(),
  modifiedBy: z.string(),
})

export type Campaign = z.infer<typeof campaignSchema>
