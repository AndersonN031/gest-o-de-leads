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
exports.CampaignLeadsController = void 0;
const CampaignRequestSchema_1 = require("./schemas/CampaignRequestSchema");
class CampaignLeadsController {
    constructor(campaignsRepository, leadsRepository) {
        this.campaignsRepository = campaignsRepository;
        this.leadsRepository = leadsRepository;
        this.getLeads = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const campaignId = Number(req.params.campaignId);
                const query = CampaignRequestSchema_1.GetCampaignLeadsRequestSchema.parse(req.query);
                const { page = "1", pageSize = "10", name, status, sortBy = "name", order = "asc" } = query;
                const limit = Number(pageSize);
                const offset = (Number(page) - 1) * limit;
                const where = { campaignId, campaignStatus: status };
                if (name)
                    where.name = { like: name, mode: "insensitive" };
                const leads = yield this.leadsRepository.find({
                    where,
                    order,
                    limit,
                    offset,
                    include: { campaigns: true }
                });
                const total = yield this.leadsRepository.count(where);
                res.json({
                    leads,
                    meta: {
                        page: Number(page),
                        pageSize: limit,
                        total,
                        totalPages: Math.ceil(total / limit)
                    }
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.addLead = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const campaignId = Number(req.params.campaignId);
                const { leadId, status = "New" } = CampaignRequestSchema_1.AddLeadRequestSchema.parse(req.body);
                this.campaignsRepository.addLead({ campaignId, leadId, status });
                res.status(201).end();
            }
            catch (error) {
                next(error);
            }
        });
        this.updateLeadStatus = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const campaignId = Number(req.params.campaignId);
                const leadId = Number(req.params.leadId);
                const { status } = CampaignRequestSchema_1.UpdateLeadStatusRequestSchema.parse(req.body);
                yield this.campaignsRepository.updatedLeadStatus({ campaignId, leadId, status });
                res.status(204).json({ message: "Status do lead atualizado com sucesso!" });
            }
            catch (error) {
                next(error);
            }
        });
        this.removeLead = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const campaignId = Number(req.params.campaignId);
                const leadId = Number(req.params.leadId);
                yield this.campaignsRepository.removeLead(campaignId, leadId);
                res.json({ message: "Lead removido da campanha com sucesso!" });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.CampaignLeadsController = CampaignLeadsController;
