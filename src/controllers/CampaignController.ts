import { Handler } from "express";
import { CreateCampaignRequestSchema, UpdateCampaignRequestSchema } from "./schemas/CampaignRequestSchema";
import { HttpError } from "../errors/HttpError";
import { CampaignsRepository } from "../repositories/CampaignsRepository";
import { CampaignsService } from "../services/CampaignService";

export class CampaignController {
    constructor(
        private readonly campaignsRepository: CampaignsRepository,
        private readonly campaignService: CampaignsService
    ) { }


    index: Handler = async (req, res, next) => {
        try {
            const campaigns = await this.campaignsRepository.find()
            res.json(campaigns);
        } catch (error) {
            next(error);
        }
    }

    create: Handler = async (req, res, next) => {
        try {
            const body = CreateCampaignRequestSchema.parse(req.body);
            const newCampaign = await this.campaignService.createCampaign(body)
            res.status(201).json(newCampaign);
        } catch (error) {
            next(error);
        }
    }

    show: Handler = async (req, res, next) => {
        try {
            const campaign = await this.campaignService.getCampaignById(Number(req.params.id))
            res.status(200).json(campaign)
        } catch (error) {
            next(error);
        }
    }

    update: Handler = async (req, res, next) => {
        try {
            const id = Number(req.params.id);
            const body = UpdateCampaignRequestSchema.parse(req.body);
            const updatedCampaign = await this.campaignService.updateCampaign(id, body)
            res.status(201).json(updatedCampaign);
        } catch (error) {
            next(error);
        }
    }

    delete: Handler = async (req, res, next) => {
        try {
            const id = Number(req.params.id);
            const deleteCampaign = await this.campaignService.deleteCampaign(id);
            res.status(201).json(deleteCampaign);
        } catch (error) {
            next(error);
        }
    }
}