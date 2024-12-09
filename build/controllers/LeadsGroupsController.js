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
const LeadsRequestSchema_1 = require("./schemas/LeadsRequestSchema");
class LeadsGroupsController {
    constructor(groupsRepository, leadsRepository) {
        this.groupsRepository = groupsRepository;
        this.leadsRepository = leadsRepository;
        this.getLeadToGroup = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const groupId = Number(req.params.groupId);
                const query = LeadsRequestSchema_1.GetLeadsRequestSchema.parse(req.query);
                const { page = "1", pageSize = "10", name, status, sortBy = "name", order = "asc" } = query;
                const pageNumber = Number(page);
                const pageSizeNumber = Number(pageSize);
                const where = { groupId };
                const limit = Number(pageSize);
                const offset = (pageNumber - 1) * limit;
                if (name)
                    where.name = { like: name, mode: "insensitive" };
                if (status)
                    where.status = status;
                const leads = yield this.leadsRepository.find({
                    where,
                    sortBy,
                    order,
                    limit,
                    offset,
                    include: { groups: true, campaigns: true }
                });
                const total = yield this.leadsRepository.count(where);
                res.json({
                    leads,
                    meta: {
                        page: Number(page),
                        pageSize: limit,
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
                const groupId = Number(req.params.groupId);
                const { leadId } = CampaignRequestSchema_1.AddLeadRequestSchema.parse(req.body);
                const updateGroup = yield this.groupsRepository.addLead(groupId, leadId);
                res.status(201).json(updateGroup);
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteLeadToGroup = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const groupId = Number(req.params.groupId);
                const leadId = Number(req.params.leadId);
                const updatedGroup = yield this.groupsRepository.removeLead(groupId, leadId);
                res.json(updatedGroup);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.LeadsGroupsController = LeadsGroupsController;
