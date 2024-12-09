import { Handler } from "express";
import { AddLeadRequestSchema, GetCampaignLeadsRequestSchema, UpdateLeadStatusRequestSchema } from "./schemas/CampaignRequestSchema";
import { prisma } from "../database";
import { Prisma } from "@prisma/client";
import { CampaignsRepository } from "../repositories/CampaignsRepository";
import { LeadsRepository, LeadsWhereParams } from "../repositories/LeadsRepository";



export class CampaignLeadsController {
    constructor(
        private readonly campaignsRepository: CampaignsRepository,
        private readonly leadsRepository: LeadsRepository
    ) { }

    getLeads: Handler = async (req, res, next) => {
        try {
            const campaignId = Number(req.params.campaignId)
            const query = GetCampaignLeadsRequestSchema.parse(req.query);
            const { page = "1", pageSize = "10", name, status, sortBy = "name", order = "asc" } = query

            const limit = Number(pageSize)
            const offset = (Number(page) - 1) * limit

            const where: LeadsWhereParams = { campaignId, campaignStatus: status }

            if (name) where.name = { like: name, mode: "insensitive" }


            const leads = await this.leadsRepository.find({
                where,
                order,
                limit,
                offset,
                include: { campaigns: true }
            })

            const total = await this.leadsRepository.count(where)
            res.json({
                leads,
                meta: {
                    page: Number(page),
                    pageSize: limit,
                    total,
                    totalPages: Math.ceil(total / limit)
                }
            })

        } catch (error) {
            next(error)
        }
    }

    addLead: Handler = async (req, res, next) => {
        try {
            const campaignId = Number(req.params.campaignId)
            const { leadId, status = "New" } = AddLeadRequestSchema.parse(req.body);
            this.campaignsRepository.addLead({ campaignId, leadId, status })
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
            res.status(204).json({ message: "Status do lead atualizado com sucesso!" })
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