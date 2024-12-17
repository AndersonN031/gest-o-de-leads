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
    constructor(campaignsRepository, campaignLeadsService) {
        this.campaignsRepository = campaignsRepository;
        this.campaignLeadsService = campaignLeadsService;
        this.getLeads = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const campaignId = Number(req.params.campaignId);
                const query = CampaignRequestSchema_1.GetCampaignLeadsRequestSchema.parse(req.query);
                const { page = "1", pageSize = "10" } = query;
                const result = yield this.campaignLeadsService.getAllCampaignsLeadsPaginated(campaignId, Object.assign(Object.assign({}, query), { page: +page, pageSize: +pageSize }));
                res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.addLead = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const campaignId = Number(req.params.campaignId);
                const { leadId, status = "New" } = CampaignRequestSchema_1.AddLeadRequestSchema.parse(req.body);
                this.campaignLeadsService.createLeadToCampaign(campaignId, leadId, status);
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
