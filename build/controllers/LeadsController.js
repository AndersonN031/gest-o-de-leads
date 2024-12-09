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
exports.LeadsController = void 0;
const LeadsRequestSchema_1 = require("./schemas/LeadsRequestSchema");
const HttpError_1 = require("../errors/HttpError");
class LeadsController {
    constructor(leadRepository) {
        this.index = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = LeadsRequestSchema_1.GetLeadsRequestSchema.parse(req.query);
                const { page = "1", pageSize = "10", name, status, sortBy = "name", order = "asc" } = query;
                const pageNumber = Number(page);
                const limit = Number(pageSize);
                const offset = (Number(page) - 1) * limit;
                const where = {};
                if (name)
                    where.name = { like: name, mode: "insensitive" };
                if (status)
                    where.status = status;
                const leads = yield this.leadsRepository.find({ where, sortBy, order, limit, offset });
                const total = yield this.leadsRepository.count(where);
                res.json({
                    data: leads,
                    meta: {
                        page: Number(page),
                        pageSize: limit,
                        total,
                        totalPages: Math.ceil(total / limit),
                    }
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const body = LeadsRequestSchema_1.CreateLeadRequestSchema.parse(req.body);
                if (!body.status)
                    body.status = "New";
                const newLead = yield this.leadsRepository.create(body);
                // const newLead = await prisma.lead.create({
                //     data: body
                // })
                res.status(201).json(newLead);
            }
            catch (error) {
                next(error);
            }
        });
        this.show = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const lead = yield this.leadsRepository.findById(Number(req.params.id));
                // const lead = await prisma.lead.findUnique({
                //     where: { id: Number(req.params.id) },
                //     include: {
                //         groups: true,
                //         campaigns: true
                //     }
                // })
                if (!lead)
                    throw new HttpError_1.HttpError(404, "Lead não encontrado");
                res.json(lead);
            }
            catch (error) {
                next(error);
            }
        });
        this.update = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const body = LeadsRequestSchema_1.UpdateLeadRequestSchema.parse(req.body);
                const lead = yield this.leadsRepository.findById(id);
                // const existingLead = await prisma.lead.findUnique({
                //     where: { id: Number(req.params.id) }
                // })
                if (!lead)
                    throw new HttpError_1.HttpError(404, "Lead não encontrado");
                if (lead.status === "New" && body.status !== "Contacted") {
                    throw new HttpError_1.HttpError(400, "Um novo lead deve ser contatado antes de ter seu status atualizado para outro valor.");
                }
                if (body.status && body.status === "Archived") {
                    const now = new Date();
                    const diffTime = Math.abs(now.getTime() - lead.updatedAt.getTime());
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    if (diffDays < 180)
                        throw new HttpError_1.HttpError(400, "Um lead só pode ser arquivado após 6 meses de inatividade.");
                }
                const updatedLead = yield this.leadsRepository.updateById(id, body);
                // const updatedLead = await prisma.lead.update({
                //     where: { id: Number(req.params.id) },
                //     data: body
                // })
                res.status(201).json(updatedLead);
            }
            catch (error) {
                next(error);
            }
        });
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const leadExists = yield this.leadsRepository.findById(id);
                // const existingLead = await prisma.lead.findUnique({
                //     where: { id: Number(req.params.id) }
                // })
                if (!leadExists)
                    throw new HttpError_1.HttpError(404, "Lead não encontrado ou já foi excluído!");
                const leads = yield this.leadsRepository.deleteById(id);
                // const leads = await prisma.lead.delete({
                //     where: { id: Number(req.params.id) }
                // })
                res.json(leads);
            }
            catch (error) {
                next(error);
            }
        });
        this.leadsRepository = leadRepository;
    }
}
exports.LeadsController = LeadsController;
