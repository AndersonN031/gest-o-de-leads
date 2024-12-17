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
exports.CampaignsService = void 0;
const HttpError_1 = require("../errors/HttpError");
class CampaignsService {
    constructor(campaignsService) {
        this.campaignsService = campaignsService;
    }
    // params: name, description, startDate, endDate 
    createCampaign(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCampaign = yield this.campaignsService.create(params);
            return newCampaign;
        });
    }
    getCampaignById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const campaign = yield this.campaignsService.findById(id);
            if (!campaign)
                throw new HttpError_1.HttpError(404, "Campanha não encontrada!");
            return campaign;
        });
    }
    updateCampaign(campaignId, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedCampaign = yield this.campaignsService.updateById(campaignId, params);
            if (!updatedCampaign)
                throw new HttpError_1.HttpError(404, "Campanha não encontrado!");
            return updatedCampaign;
        });
    }
    deleteCampaign(campaignId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedCampaign = yield this.campaignsService.deleteById(campaignId);
            if (!deletedCampaign)
                throw new HttpError_1.HttpError(404, "Campanha não encontrado!");
            return deletedCampaign;
        });
    }
}
exports.CampaignsService = CampaignsService;
