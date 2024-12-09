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
const CampaignRequestSchema_1 = require("./schemas/CampaignRequestSchema");
const HttpError_1 = require("../errors/HttpError");
class CampaignController {
    constructor(campaignsRepository) {
        this.campaignsRepository = campaignsRepository;
        this.index = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const campaigns = yield this.campaignsRepository.find();
                res.json(campaigns);
            }
            catch (error) {
                next(error);
            }
        });
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const body = CampaignRequestSchema_1.CreateCampaignRequestSchema.parse(req.body);
                const newCampaign = yield this.campaignsRepository.create(body);
                res.status(201).json(newCampaign);
            }
            catch (error) {
                next(error);
            }
        });
        this.show = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const campaign = yield this.campaignsRepository.findById(Number(req.params.id));
                if (!campaign)
                    throw new HttpError_1.HttpError(404, "Campanha não encontrada!");
                res.status(200).json(campaign);
            }
            catch (error) {
                next(error);
            }
        });
        this.update = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const body = CampaignRequestSchema_1.UpdateCampaignRequestSchema.parse(req.body);
                const updatedCampaign = yield this.campaignsRepository.updateById(id, body);
                if (!updatedCampaign)
                    throw new HttpError_1.HttpError(404, "Campanha não encontrado!");
                res.status(201).json(updatedCampaign);
            }
            catch (error) {
                next(error);
            }
        });
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const deleteCampaign = yield this.campaignsRepository.deleteById(id);
                if (!deleteCampaign)
                    throw new HttpError_1.HttpError(404, "Campanha não encontrado!");
                res.status(201).json(deleteCampaign);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.CampaignController = CampaignController;
