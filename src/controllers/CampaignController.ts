import { Handler } from "express";
import { prisma } from "../database";
import { CreateCampaignRequestSchema, UpdateCampaignRequestSchema } from "./schemas/CampaignRequestSchema";
import { HttpError } from "../errors/HttpError";

export class CampaignController {
    index: Handler = async (req, res, next) => {
        try {
            const campaigns = await prisma.campaign.findMany();
            res.json(campaigns);

        } catch (error) {
            next(error);
        }
    }

    create: Handler = async (req, res, next) => {
        try {
            const body = CreateCampaignRequestSchema.parse(req.body);
            const newCampaign = await prisma.campaign.create({ data: body });
            res.status(201).json(newCampaign);
        } catch (error) {
            next(error);
        }
    }

    show: Handler = async (req, res, next) => {
        try {
            const campaign = await prisma.campaign.findUnique({
                where: { id: Number(req.params.id) },
                include: {
                    leads: {
                        include: {
                            lead: true
                        }
                    }
                }
            });

            if (!campaign) throw new HttpError(404, "Campanha não encontrada");
            res.status(201).json(campaign);
        } catch (error) {
            next(error);
        }
    }

    update: Handler = async (req, res, next) => {
        try {
            const id = Number(req.params.id);
            const body = UpdateCampaignRequestSchema.parse(req.body);

            const campaignExists = await prisma.campaign.findUnique({ where: { id } })
            if (!campaignExists) throw new HttpError(404, "Campanha não encontrado!");

            const updatedCampaign = await prisma.campaign.update({ data: body, where: { id } })
            res.status(201).json(updatedCampaign);
        } catch (error) {
            next(error);
        }
    }

    delete: Handler = async (req, res, next) => {
        try {
            const id = Number(req.params.id);
            const campaignExists = await prisma.campaign.findUnique({ where: { id } });

            if (!campaignExists) throw new HttpError(404, "Campanha não encontrado!");
            const deleteCampaign = await prisma.campaign.delete({ where: { id } });

            res.status(201).json(deleteCampaign);
        } catch (error) {
            next(error);
        }
    }
}