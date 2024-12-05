import { Handler } from "express";
import { AddLeadRequestSchema } from "./schemas/CampaignRequestSchema";
import { GetLeadsRequestSchema } from "./schemas/LeadsRequestSchema";
import { GroupsRepository } from "../repositories/GroupsRepository";
import { LeadsRepository, LeadsWhereParams } from "../repositories/LeadsRepository";

export class LeadsGroupsController {

    constructor(
        private readonly groupsRepository: GroupsRepository,
        private readonly leadsRepository: LeadsRepository
    ) { }

    getLeadToGroup: Handler = async (req, res, next) => {
        try {
            const groupId = Number(req.params.groupId)

            const query = GetLeadsRequestSchema.parse(req.query)
            const { page = "1", pageSize = "10", name, status, sortBy = "name", order = "asc" } = query

            const pageNumber = Number(page)
            const pageSizeNumber = Number(pageSize)

            const where: LeadsWhereParams = { groupId }

            const limit = Number(pageSize)
            const offset = (pageNumber - 1) * limit

            if (name) where.name = { like: name, mode: "insensitive" }
            if (status) where.status = status

            const leads = await this.leadsRepository.find({
                where,
                sortBy,
                order,
                limit,
                offset,
                include: { groups: true, campaigns: true }
            })

            const total = await this.leadsRepository.count(where)

            res.json({
                leads,
                meta: {
                    page: Number(page),
                    pageSize: limit,
                    total,
                    totalPages: Math.ceil(total / pageSizeNumber)
                }
            })


        } catch (error) {
            next(error)
        }
    }


    addLeadToGroup: Handler = async (req, res, next) => {
        try {
            const groupId = Number(req.params.groupId);
            const { leadId } = AddLeadRequestSchema.parse(req.body);
            const updateGroup = await this.groupsRepository.addLead(groupId, leadId)
            res.status(201).json(updateGroup)
        } catch (error) {
            next(error);
        }
    }

    deleteLeadToGroup: Handler = async (req, res, next) => {
        try {
            const groupId = Number(req.params.groupId)
            const leadId = Number(req.params.leadId)
            const updatedGroup = await this.groupsRepository.removeLead(groupId, leadId)
            res.json(updatedGroup)
        } catch (error) {
            next(error)
        }
    }
}