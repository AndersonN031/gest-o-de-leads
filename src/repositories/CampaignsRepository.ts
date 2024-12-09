import { Campaign } from "@prisma/client"

export type LeadCampaignStatus = "New" | "Engaged" | "FollowUp_Scheduled" | "Contacted" | "Qualified" | "Converted" | "Unresposnvive" | "Disqualified" | "Re_Engaged" | "Opted_Out"

export interface CreateCampaignsAttributes {
    name: string
    description: string
    startDate: Date
    endDate?: Date
}

export interface AddLeadToCampaignAttributes {
    campaignId: number
    leadId: number
    status: LeadCampaignStatus
}

export interface CampaignsRepository {
    find: () => Promise<Campaign[]>
    findById: (id: number) => Promise<Campaign | null>
    create: (attributes: CreateCampaignsAttributes) => Promise<Campaign>
    updateById: (id: number, attributes: Partial<CreateCampaignsAttributes>) => Promise<Campaign | null>
    deleteById: (id: number) => Promise<Campaign | null>
    addLead: (attributes: AddLeadToCampaignAttributes) => Promise<void>
    updatedLeadStatus: (attributes: AddLeadToCampaignAttributes) => Promise<void>
    removeLead: (campaignId: number, leadId: number) => Promise<void>
}