import { LeadCampaign } from "@prisma/client"

export type LeadsCampaignStatus = "New" | "Engaged" | "folloUp_Scheduled" | "Contacted" | "Qualified" | "Converted" | "Unresposnvive" | "Disqualified" | "Re_Engaged" | "Opted_Out"

export interface CreateCampaignsLeadsAttributes {
    leadId: number
    campaignId: number
    status?: LeadsCampaignStatus
}

export interface LeadsCampaignsWhereParams {
    name?: {
        like?: string
        equals?: string
        mode?: "default" | "insensitive"
    }
    include?: {
        campaigns?: boolean
        lead?: number
    }
    status?: LeadsCampaignStatus
    campaignId?: number

}

export interface findLeadsCampaignsParams {
    where?: LeadsCampaignsWhereParams
    sortBy?: "name" | "status" | "createdAt"
    order?: "asc" | "desc"
    limit?: number
    offset?: number
    status?: string
    include?: {
        groups?: boolean
        campaigns?: boolean
    }
}

export interface CampaignsLeadsRepository {
    find: (params: findLeadsCampaignsParams) => Promise<LeadCampaign[]>
    count: (where: LeadsCampaignsWhereParams) => Promise<number>
    // findById: (id: number) => Promise<LeadCampaign | null>
    // create: (attributes: CreateCampaignsLeadsAttributes) => Promise<LeadCampaign>
    // updateById: (id: number, attributes: Partial<CreateCampaignsLeadsAttributes>) => Promise<LeadCampaign | null>
    // deleteById: (id: number) => Promise<LeadCampaign | null>
    // addLead: (campaignId: number, leadId: number) => Promise<Campaign | null>
    // removeLead: (campaignId: number, leadId: number) => Promise<Campaign | null>
}