import { Lead, Prisma } from "@prisma/client"
import { LeadCampaignStatus } from "./CampaignsRepository"

export type LeadsStatus = "New" | "Contacted" | "Qualified" | "Unresponsive" | "Disqualified" | "Archived"


export interface LeadsWhereParams {
    name?: {
        like?: string
        equals?: string
        mode?: "default" | "insensitive"
    }
    status?: LeadsStatus
    campaignStatus?: LeadCampaignStatus
    groupId?: number
    campaignId?: number

}



export interface findLeadsParams {
    where?: LeadsWhereParams
    sortBy?: "name" | "status" | "createdAt"
    order?: "asc" | "desc"
    limit?: number
    offset?: number
    include?: {
        groups?: boolean
        campaigns?: boolean
    }
}

export interface CreateLeadAttributes {
    name: string
    email: string
    phone: string
    status?: LeadsStatus
}

export interface LeadsRepository {
    find: (params: findLeadsParams) => Promise<Lead[]>
    findById: (id: number) => Promise<Lead | null>
    count: (where: LeadsWhereParams) => Promise<number>
    create: (attributes: CreateLeadAttributes) => Promise<Lead>
    updateById: (id: number, attributes: Partial<CreateLeadAttributes>) => Promise<Lead | null>
    deleteById: (id: number) => Promise<Lead | null>

}