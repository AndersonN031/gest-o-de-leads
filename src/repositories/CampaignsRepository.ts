import { Campaign } from "@prisma/client"

export interface CreateCampaignsAttributes {
    name: string
    description: string
    startDate: Date
    endDate?: Date
}

export interface CampaignsRepository {
    find: () => Promise<Campaign[]>
    findById: (id: number) => Promise<Campaign | null>
    create: (attributes: CreateCampaignsAttributes) => Promise<Campaign>
    updateById: (id: number, attributes: Partial<CreateCampaignsAttributes>) => Promise<Campaign | null>
    deleteById: (id: number) => Promise<Campaign | null>
    // addLead: (campaignId: number, leadId: number) => Promise<Campaign | null>
    // removeLead: (campaignId: number, leadId: number) => Promise<Campaign | null>
}