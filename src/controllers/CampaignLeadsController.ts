import { Handler } from "express";
import { AddLeadRequestSchema, GetCampaignLeadsRequestSchema, UpdateLeadStatusRequestSchema } from "./schemas/CampaignRequestSchema";
import { CampaignsRepository } from "../repositories/CampaignsRepository";
import { CampaignsLeadsService } from "../services/CampaignLeadsService";



export class CampaignLeadsController {
    constructor(
        private readonly campaignsRepository: CampaignsRepository,
        private readonly campaignLeadsService: CampaignsLeadsService
    ) { }

    getLeads: Handler = async (req, res, next) => {
        try {
            const campaignId = Number(req.params.campaignId)
            const query = GetCampaignLeadsRequestSchema.parse(req.query);
            const { page = "1", pageSize = "10" } = query;
            const result = await this.campaignLeadsService.getAllCampaignsLeadsPaginated(campaignId, {
                ...query,
                page: +page,
                pageSize: +pageSize
            })
            res.status(200).json(result);

        } catch (error) {
            next(error)
        }
    }

    addLead: Handler = async (req, res, next) => {
        try {
            const campaignId = Number(req.params.campaignId)
            const { leadId, status = "New" } = AddLeadRequestSchema.parse(req.body);
            this.campaignLeadsService.createLeadToCampaign(campaignId, leadId, status);
            res.status(201).end()
        } catch (error) {
            next(error)
        }
    }

    updateLeadStatus: Handler = async (req, res, next) => {
        try {
            const campaignId = Number(req.params.campaignId)
            const leadId = Number(req.params.leadId)
            const { status } = UpdateLeadStatusRequestSchema.parse(req.body);
            await this.campaignsRepository.updatedLeadStatus({ campaignId, leadId, status })
            res.status(204).json({ message: "Status do lead atualizado com sucesso!" });
        } catch (error) {
            next(error)
        }
    }

    removeLead: Handler = async (req, res, next) => {
        try {
            const campaignId = Number(req.params.campaignId)
            const leadId = Number(req.params.leadId)
            await this.campaignsRepository.removeLead(campaignId, leadId)
            res.json({ message: "Lead removido da campanha com sucesso!" })
        } catch (error) {
            next(error)
        }
    }
}