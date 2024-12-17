import { HttpError } from "../errors/HttpError";
import { AddLeadToCampaignAttributes, CampaignsRepository, CreateCampaignsAttributes, LeadCampaignStatus } from "../repositories/CampaignsRepository";
import { LeadsRepository, LeadsWhereParams } from "../repositories/LeadsRepository";

interface GetCampaignLeadWithPaginationParams {
    page?: number
    pageSize?: number
    name?: string
    status?: LeadCampaignStatus
    sortBy?: "name" | "status" | "createdAt"
    order?: "asc" | "desc"
}

export class CampaignsLeadsService {
    constructor(private readonly leadsRepository: LeadsRepository,
        private readonly campaignsRepository: CampaignsRepository
    ) { }
    async getAllCampaignsLeadsPaginated(campaignId: number, params: GetCampaignLeadWithPaginationParams) {
        const { page = 1, pageSize = 10, name, status, sortBy, order } = params

        const limit = Number(pageSize)
        const offset = (Number(page) - 1) * limit

        const where: LeadsWhereParams = { campaignId, campaignStatus: status }

        if (name) where.name = { like: name, mode: "insensitive" }


        const campaignsLeads = await this.leadsRepository.find({
            where,
            sortBy,
            order,
            limit,
            offset,
            include: { campaigns: true }
        })

        const total = await this.leadsRepository.count(where)
        return {
            campaignsLeads,
            meta: {
                page: Number(page),
                pageSize: limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        }
    }

    async createLeadToCampaign(campaignId: number, leadId: number, status: LeadCampaignStatus) {
        if (!campaignId || !leadId) throw new HttpError(400, "Campaign ID and Lead ID are required.");

        const leadData: AddLeadToCampaignAttributes = {
            campaignId,
            leadId,
            status
        };

        await this.campaignsRepository.addLead(leadData)
        return {message: "Lead adicionada com sucesso na campanha!"};

    }
}