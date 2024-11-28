import { Handler } from "express";
import { prisma } from "../database";
import { CreateLeadRequestSchema, GetLeadsRequestSchema, UpdateLeadRequestSchema } from "./schemas/LeadsRequestSchema";
import { HttpError } from "../errors/HttpError";
import { Prisma } from "@prisma/client";

export class LeadsController {
    index: Handler = async (req, res, next) => {
        try {
            const query = GetLeadsRequestSchema.parse(req.query);
            const { page = "1", pageSize = "10", name, status, sortBy = "name", order = "asc" } = query;

            const pageNumber = Number(page);
            const pageSizeNumber = Number(pageSize);
            
            const where: Prisma.LeadWhereInput = {}

            if(name) where.name = {contains: name, mode: "insensitive"};
            if(status) where.status = status;

            const leads = await prisma.lead.findMany({
                where,
                skip: (pageNumber - 1) * pageSizeNumber,
                take: pageSizeNumber,
                orderBy: {[sortBy]: order}
            });

            const total = await prisma.lead.count({where})
            
            res.json({
                data: leads,
                meta: {
                    page: pageNumber,
                    pageSize: pageSize,
                    total,
                    totalPages: Math.ceil(total / pageSizeNumber),
                    pageSizeNumber: pageSizeNumber
                }
            });
        } catch (error) {
            next(error)
        }

    }

    create: Handler = async (req, res, next) => {
        try {
            const body = CreateLeadRequestSchema.parse(req.body);
            const newLead = await prisma.lead.create({
                data: body
            })
            res.status(201).json(newLead)
        } catch (error) {
            next(error)
        }
    }

    show: Handler = async (req, res, next) => {
        try {
            const lead = await prisma.lead.findUnique({
                where: { id: Number(req.params.id) },
                include: {
                    groups: true,
                    campaigns: true
                }
            })

            if (!lead) throw new HttpError(404, "Lead não encontrado")
            res.json(lead)
        } catch (error) {
            next(error)
        }
    }

    update: Handler = async (req, res, next) => {
        try {

            const body = UpdateLeadRequestSchema.parse(req.body);

            const existingLead = await prisma.lead.findUnique({
                where: { id: Number(req.params.id) }
            })

            if (!existingLead) throw new HttpError(404, "Lead não encontrado");

            const updatedLead = await prisma.lead.update({
                where: { id: Number(req.params.id) },
                data: body
            })

            res.status(201).json(updatedLead)
        } catch (error) {
            next(error)
        }
    }

    delete: Handler = async (req, res, next) => {
        try {
            const existingLead = await prisma.lead.findUnique({
                where: { id: Number(req.params.id) }
            })

            if (!existingLead) throw new HttpError(404, "Lead não encontrado ou já foi excluído!");

            const leads = await prisma.lead.delete({
                where: { id: Number(req.params.id) }
            })
            res.json(leads)
        } catch (error) {
            next(error)
        }
    }

}