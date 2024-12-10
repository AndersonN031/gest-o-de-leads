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
exports.LeadsService = void 0;
const HttpError_1 = require("../errors/HttpError");
class LeadsService {
    constructor(leadsRepository) {
        this.leadsRepository = leadsRepository;
    }
    getAllLeadsPaginated(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, status, page = 1, pageSize = 10, sortBy, order } = params;
            const limit = pageSize;
            const offset = (page - 1) * limit;
            const where = {};
            if (name)
                where.name = { like: name, mode: "insensitive" };
            if (status)
                where.status = status;
            const leads = yield this.leadsRepository.find({ where, sortBy, order, limit, offset });
            const total = yield this.leadsRepository.count(where);
            return {
                data: leads,
                meta: {
                    page,
                    pageSize,
                    total,
                    totalPages: Math.ceil(total / pageSize),
                }
            };
        });
    }
    createLead(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!params.status)
                params.status = "New";
            const newLead = yield this.leadsRepository.create(params);
            return newLead;
        });
    }
    getLeadById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const lead = yield this.leadsRepository.findById(id);
            if (!lead)
                throw new HttpError_1.HttpError(404, "Lead não encontrado");
            return lead;
        });
    }
    updateLead(leadId, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const lead = yield this.leadsRepository.findById(leadId);
            if (!lead)
                throw new HttpError_1.HttpError(404, "Lead não encontrado");
            if (lead.status === "New" && params.status !== "Contacted") {
                throw new HttpError_1.HttpError(400, "Um novo lead deve ser contatado antes de ter seu status atualizado para outro valor.");
            }
            if (params.status && params.status === "Archived") {
                const now = new Date();
                const diffTime = Math.abs(now.getTime() - lead.updatedAt.getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                if (diffDays < 180)
                    throw new HttpError_1.HttpError(400, "Um lead só pode ser arquivado após 6 meses de inatividade.");
            }
            const updatedLead = yield this.leadsRepository.updateById(leadId, params);
            return updatedLead;
        });
    }
    deleteLead(leadId) {
        return __awaiter(this, void 0, void 0, function* () {
            const leadExists = yield this.leadsRepository.findById(leadId);
            if (!leadExists)
                throw new HttpError_1.HttpError(404, "Lead não encontrado ou já foi excluído!");
            const deletedLead = yield this.leadsRepository.deleteById(leadId);
            return deletedLead;
        });
    }
}
exports.LeadsService = LeadsService;
