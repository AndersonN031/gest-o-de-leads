"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignController = void 0;
const database_1 = require("../database");
const CampaignRequestSchema_1 = require("./schemas/CampaignRequestSchema");
const HttpError_1 = require("../errors/HttpError");
class CampaignController {
    constructor() {
        this.index = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const campaigns = yield database_1.prisma.campaign.findMany();
                res.json(campaigns);
            }
            catch (error) {
                next(error);
            }
        });
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const body = CampaignRequestSchema_1.CreateCampaignRequestSchema.parse(req.body);
                const newCampaign = yield database_1.prisma.campaign.create({ data: body });
                res.status(201).json(newCampaign);
            }
            catch (error) {
                next(error);
            }
        });
        this.show = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const campaign = yield database_1.prisma.campaign.findUnique({
                    where: { id: Number(req.params.id) },
                    include: {
                        leads: {
                            include: {
                                lead: true
                            }
                        }
                    }
                });
                if (!campaign)
                    throw new HttpError_1.HttpError(404, "Campanha não encontrada");
                res.status(201).json(campaign);
            }
            catch (error) {
                next(error);
            }
        });
        this.update = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const body = CampaignRequestSchema_1.UpdateCampaignRequestSchema.parse(req.body);
                const campaignExists = yield database_1.prisma.campaign.findUnique({ where: { id } });
                if (!campaignExists)
                    throw new HttpError_1.HttpError(404, "Campanha não encontrado!");
                const updatedCampaign = yield database_1.prisma.campaign.update({ data: body, where: { id } });
                res.status(201).json(updatedCampaign);
            }
            catch (error) {
                next(error);
            }
        });
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const campaignExists = yield database_1.prisma.campaign.findUnique({ where: { id } });
                if (!campaignExists)
                    throw new HttpError_1.HttpError(404, "Campanha não encontrado!");
                const deleteCampaign = yield database_1.prisma.campaign.delete({ where: { id } });
                res.status(201).json(deleteCampaign);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.CampaignController = CampaignController;
