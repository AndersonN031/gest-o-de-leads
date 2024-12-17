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
class CampaignController {
    constructor(campaignsRepository, campaignService) {
        this.campaignsRepository = campaignsRepository;
        this.campaignService = campaignService;
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
                const newCampaign = yield this.campaignService.createCampaign(body);
                res.status(201).json(newCampaign);
            }
            catch (error) {
                next(error);
            }
        });
        this.show = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const campaign = yield this.campaignService.getCampaignById(Number(req.params.id));
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
                const updatedCampaign = yield this.campaignService.updateCampaign(id, body);
                res.status(201).json(updatedCampaign);
            }
            catch (error) {
                next(error);
            }
        });
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const deleteCampaign = yield this.campaignService.deleteCampaign(id);
                res.status(201).json(deleteCampaign);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.CampaignController = CampaignController;
