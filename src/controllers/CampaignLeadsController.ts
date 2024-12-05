import { Handler } from "express";
import { AddLeadRequestSchema, GetCampaignLeadsRequestSchema, UpdateLeadStatusRequestSchema } from "./schemas/CampaignRequestSchema";
import { prisma } from "../database";
import { CampaignsLeadsRepository, LeadsCampaignsWhereParams } from "../repositories/CampaignLeadsRepository";


export class CampaignLeadsController {
    constructor(
        private readonly leadsCampaignsRepository: CampaignsLeadsRepository
    ) { }
    getLeads: Handler = async (req, res, next) => {
        try {
            const campaignId = Number(req.params.campaignId)

            const query = GetCampaignLeadsRequestSchema.parse(req.query);
            const { page = "1", pageSize = "10", name, status, sortBy = "name", order = "asc" } = query

            const pageNumber = Number(page);
            const pageSizeNumber = Number(pageSize);

            const where: LeadsCampaignsWhereParams = { campaignId }

            if (name) where.name = { like: name, mode: "insensitive" }
            if (status) where.status = status

            const leads = await this.leadsCampaignsRepository.find({
                where,
                sortBy,
                order,
                include: { groups: true, campaigns: true },
                status
            })

            const total = await this.leadsCampaignsRepository.count(where)
            res.json({
                leads,
                meta: {
                    page: pageNumber,
                    pageSize: pageSizeNumber,
                    total,
                    totalPages: Math.ceil(total / pageSizeNumber)
                }
            })

        } catch (error) {
            next(error)
        }
    }

    addLead: Handler = async (req, res, next) => {
        try {
            const body = AddLeadRequestSchema.parse(req.body);
            await prisma.leadCampaign.create({
                data: {
                    campaignId: Number(req.params.campaignId),
                    leadId: body.leadId,
                    status: body.status
                }
            })
            res.status(201).end()
        } catch (error) {
            next(error)
        }
    }

    updateLeadStatus: Handler = async (req, res, next) => {
        try {
            const body = UpdateLeadStatusRequestSchema.parse(req.body);
            const updatedLeadCampaign = await prisma.leadCampaign.update({
                data: body,
                where: {
                    leadId_campaignId: {
                        campaignId: Number(req.params.campaignId),
                        leadId: Number(req.params.leadId)
                    }
                }
            })
            res.status(201).json(updatedLeadCampaign)
        } catch (error) {
            next(error)
        }
    }

    removeLead: Handler = async (req, res, next) => {
        try {
            const removeLead = await prisma.leadCampaign.delete({
                where: {
                    leadId_campaignId: {
                        campaignId: Number(req.params.campaignId),
                        leadId: Number(req.params.leadId)
                    }
                }
            })
            res.json({ removeLead })
        } catch (error) {
            next(error)
        }
    }
}