import { Handler } from "express";
import { AddLeadRequestSchema } from "./schemas/CampaignRequestSchema";
import { prisma } from "../database";
import { HttpError } from "../errors/HttpError";
import { GetLeadsRequestSchema } from "./schemas/LeadsRequestSchema";
import { Prisma } from "@prisma/client";

export class LeadsGroupsController {
    getLeadToGroup: Handler = async (req, res, next) => {
        try {
            const groupId = Number(req.params.groupId)

            const query = GetLeadsRequestSchema.parse(req.query)
            const { page = "1", pageSize = "10", name, status, sortBy = "name", order = "asc" } = query

            const pageNumber = Number(page)
            const pageSizeNumber = Number(pageSize)

            const where: Prisma.LeadWhereInput = {
                groups: {
                    some: { id: groupId }
                }
            }

            if (name) where.name = { contains: name, mode: "insensitive" }
            if (status) where.status = status

            const leads = await prisma.lead.findMany({
                where,
                orderBy: { [sortBy]: order },
                skip: (pageNumber - 1) * pageSizeNumber,
                take: pageSizeNumber,
                include: {
                    groups: true
                }
            })


            const total = await prisma.lead.count({ where })

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


    addLeadToGroup: Handler = async (req, res, next) => {
        try {
            const { leadId } = AddLeadRequestSchema.parse(req.body);
            const groupId = Number(req.params.groupId);

            const group = await prisma.group.findUnique({
                where: { id: groupId },
            });

            if (!group) throw new HttpError(404, "Grupo não encontrado");

            const lead = await prisma.lead.findUnique({
                where: { id: leadId },
            });

            if (!lead) throw new HttpError(404, "Lead não encontrado");

            const updatedGroup = await prisma.group.update({
                where: { id: group.id },
                data: {
                    leads: {
                        connect: { id: leadId },
                    },
                },
            });


            res.json({ message: "Lead adicionado ao grupo com sucesso", group: updatedGroup });
        } catch (error) {
            next(error);
        }
    }

    deleteLeadToGroup: Handler = async (req, res, next) => {
        try {
            const groupId = Number(req.params.groupId);
            const leadId = Number(req.params.leadId);

            console.log("ID do grupo recebido:", groupId);
            console.log("ID do lead recebido:", leadId);

            if (isNaN(groupId) || isNaN(leadId)) {
                throw new HttpError(400, "IDs inválidos");
            }

            const group = await prisma.group.findUnique({
                where: { id: groupId },
            });

            if (!group) throw new HttpError(404, "Grupo não encontrado");

            const lead = await prisma.lead.findUnique({
                where: { id: leadId },
            });

            if (!lead) throw new HttpError(404, "Lead não encontrado");

            const updatedGroup = await prisma.group.update({
                where: { id: group.id },
                data: {
                    leads: {
                        disconnect: { id: leadId },
                    },
                },
            });

            res.json({
                message: "Lead removido do grupo com sucesso!",
                group: updatedGroup
            })
        } catch (error) {
            next(error)
        }
    }
}