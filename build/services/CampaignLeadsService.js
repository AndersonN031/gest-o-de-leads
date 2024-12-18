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
exports.CampaignsLeadsService = void 0;
const HttpError_1 = require("../errors/HttpError");
class CampaignsLeadsService {
    constructor(leadsRepository, campaignsRepository) {
        this.leadsRepository = leadsRepository;
        this.campaignsRepository = campaignsRepository;
    }
    getAllCampaignsLeadsPaginated(campaignId, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page = 1, pageSize = 10, name, status, sortBy, order } = params;
            const limit = Number(pageSize);
            const offset = (Number(page) - 1) * limit;
            const where = { campaignId, campaignStatus: status };
            if (name)
                where.name = { like: name, mode: "insensitive" };
            const campaignsLeads = yield this.leadsRepository.find({
                where,
                sortBy,
                order,
                limit,
                offset,
                include: { campaigns: true }
            });
            const total = yield this.leadsRepository.count(where);
            return {
                campaignsLeads,
                meta: {
                    page: Number(page),
                    pageSize: limit,
                    total,
                    totalPages: Math.ceil(total / limit)
                }
            };
        });
    }
    createLeadToCampaign(campaignId, leadId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const leadData = {
                campaignId,
                leadId,
                status
            };
            yield this.campaignsRepository.addLead(leadData);
            return { message: "Lead adicionada com sucesso na campanha!" };
        });
    }
    updateLeadCampaign(campaignId, leadId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!campaignId || !leadId)
                throw new HttpError_1.HttpError(404, "Não foi possivel encontrar o ID da campanha ou do lead");
            const campaignData = {
                campaignId,
                leadId,
                status
            };
            yield this.campaignsRepository.updatedLeadStatus(campaignData);
            return { message: "Lead atualizado com sucesso na campanha!" };
        });
    }
    deleteLeadToCampaign(campaignId, leadId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.campaignsRepository.removeLead(campaignId, leadId);
            return { message: "Lead removido da campanha com sucesso!" };
        });
    }
}
exports.CampaignsLeadsService = CampaignsLeadsService;
