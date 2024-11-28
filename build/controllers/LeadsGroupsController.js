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
exports.LeadsGroupsController = void 0;
const CampaignRequestSchema_1 = require("./schemas/CampaignRequestSchema");
const database_1 = require("../database");
const HttpError_1 = require("../errors/HttpError");
const LeadsRequestSchema_1 = require("./schemas/LeadsRequestSchema");
class LeadsGroupsController {
    constructor() {
        this.getLeadToGroup = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const groupId = Number(req.params.groupId);
                const query = LeadsRequestSchema_1.GetLeadsRequestSchema.parse(req.query);
                const { page = "1", pageSize = "10", name, status, sortBy = "name", order = "asc" } = query;
                const pageNumber = Number(page);
                const pageSizeNumber = Number(pageSize);
                const where = {
                    groups: {
                        some: { id: groupId }
                    }
                };
                if (name)
                    where.name = { contains: name, mode: "insensitive" };
                if (status)
                    where.status = status;
                const leads = yield database_1.prisma.lead.findMany({
                    where,
                    orderBy: { [sortBy]: order },
                    skip: (pageNumber - 1) * pageSizeNumber,
                    take: pageSizeNumber,
                    include: {
                        groups: true
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
        this.addLeadToGroup = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { leadId } = CampaignRequestSchema_1.AddLeadRequestSchema.parse(req.body);
                const groupId = Number(req.params.groupId);
                const group = yield database_1.prisma.group.findUnique({
                    where: { id: groupId },
                });
                if (!group)
                    throw new HttpError_1.HttpError(404, "Grupo não encontrado");
                const lead = yield database_1.prisma.lead.findUnique({
                    where: { id: leadId },
                });
                if (!lead)
                    throw new HttpError_1.HttpError(404, "Lead não encontrado");
                const updatedGroup = yield database_1.prisma.group.update({
                    where: { id: group.id },
                    data: {
                        leads: {
                            connect: { id: leadId },
                        },
                    },
                });
                res.json({ message: "Lead adicionado ao grupo com sucesso", group: updatedGroup });
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteLeadToGroup = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const groupId = Number(req.params.groupId);
                const leadId = Number(req.params.leadId);
                console.log("ID do grupo recebido:", groupId);
                console.log("ID do lead recebido:", leadId);
                if (isNaN(groupId) || isNaN(leadId)) {
                    throw new HttpError_1.HttpError(400, "IDs inválidos");
                }
                const group = yield database_1.prisma.group.findUnique({
                    where: { id: groupId },
                });
                if (!group)
                    throw new HttpError_1.HttpError(404, "Grupo não encontrado");
                const lead = yield database_1.prisma.lead.findUnique({
                    where: { id: leadId },
                });
                if (!lead)
                    throw new HttpError_1.HttpError(404, "Lead não encontrado");
                const updatedGroup = yield database_1.prisma.group.update({
                    where: { id: group.id },
                    data: {
                        leads: {
                            disconnect: { id: leadId },
                        },
                    },
                });
                res.json({
                    message: "Lead removido do grupo com sucesso!",
                    group: updatedGroup
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.LeadsGroupsController = LeadsGroupsController;
