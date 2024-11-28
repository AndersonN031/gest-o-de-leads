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
const database_1 = require("../database");
class CampaignLeadsController {
    constructor() {
        this.getLeads = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const campaignId = Number(req.params.campaign);
                const query = CampaignRequestSchema_1.GetCampaignLeadsRequestSchema.parse(req.query);
                const { page = "1", pageSize = "10", name, status, sortBy = "name", order = "asc" } = query;
                const pageNumber = Number(page);
                const pageSizeNumber = Number(pageSize);
                const where = {
                    campaigns: {
                        some: {
                            campaignId: campaignId ? { equals: Number(campaignId) } : undefined // Condicional para garantir que 'campaignId' seja atribuído corretamente
                        }
                    }
                };
                if (name)
                    where.name = { contains: name, mode: "insensitive" };
                if (status)
                    where.campaigns = { some: { status } };
                const leads = yield database_1.prisma.lead.findMany({
                    where,
                    orderBy: { [sortBy]: order },
                    skip: (pageNumber - 1) * pageSizeNumber,
                    take: pageSizeNumber,
                    include: {
                        campaigns: {
                            select: {
                                campaignId: true,
                                leadId: true,
                                status: true
                            }
                        }
                    }
                });
                const total = yield database_1.prisma.lead.count({ where });
                res.json({
                    leads,
                    meta: {
                        page: pageNumber,
                        pageSize: pageSizeNumber,
                        total,
                        totalPages: Math.ceil(total / pageSizeNumber)
                    }
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.addLead = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const body = CampaignRequestSchema_1.AddLeadRequestSchema.parse(req.body);
                yield database_1.prisma.leadCampaign.create({
                    data: {
                        campaignId: Number(req.params.campaignId),
                        leadId: body.leadId,
                        status: body.status
                    }
                });
                res.status(201).end();
            }
            catch (error) {
                next(error);
            }
        });
        this.updateLeadStatus = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const body = CampaignRequestSchema_1.UpdateLeadStatusRequestSchema.parse(req.body);
                const updatedLeadCampaign = yield database_1.prisma.leadCampaign.update({
                    data: body,
                    where: {
                        leadId_campaignId: {
                            campaignId: Number(req.params.campaignId),
                            leadId: Number(req.params.leadId)
                        }
                    }
                });
                res.status(201).json(updatedLeadCampaign);
            }
            catch (error) {
                next(error);
            }
        });
        this.removeLead = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const removeLead = yield database_1.prisma.leadCampaign.delete({
                    where: {
                        leadId_campaignId: {
                            campaignId: Number(req.params.campaignId),
                            leadId: Number(req.params.leadId)
                        }
                    }
                });
                res.json({ removeLead });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.CampaignLeadsController = CampaignLeadsController;
