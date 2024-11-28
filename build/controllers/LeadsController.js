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
const database_1 = require("../database");
const LeadsRequestSchema_1 = require("./schemas/LeadsRequestSchema");
const HttpError_1 = require("../errors/HttpError");
class LeadsController {
    constructor() {
        this.index = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = LeadsRequestSchema_1.GetLeadsRequestSchema.parse(req.query);
                const { page = "1", pageSize = "10", name, status, sortBy = "name", order = "asc" } = query;
                const pageNumber = Number(page);
                const pageSizeNumber = Number(pageSize);
                const where = {};
                if (name)
                    where.name = { contains: name, mode: "insensitive" };
                if (status)
                    where.status = status;
                const leads = yield database_1.prisma.lead.findMany({
                    where,
                    skip: (pageNumber - 1) * pageSizeNumber,
                    take: pageSizeNumber,
                    orderBy: { [sortBy]: order }
                });
                const total = yield database_1.prisma.lead.count({ where });
                res.json({
                    data: leads,
                    meta: {
                        page: pageNumber,
                        pageSize: pageSize,
                        total,
                        totalPages: Math.ceil(total / pageSizeNumber),
                        pageSizeNumber: pageSizeNumber
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
                const newLead = yield database_1.prisma.lead.create({
                    data: body
                });
                res.status(201).json(newLead);
            }
            catch (error) {
                next(error);
            }
        });
        this.show = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const lead = yield database_1.prisma.lead.findUnique({
                    where: { id: Number(req.params.id) },
                    include: {
                        groups: true,
                        campaigns: true
                    }
                });
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
                const body = LeadsRequestSchema_1.UpdateLeadRequestSchema.parse(req.body);
                const existingLead = yield database_1.prisma.lead.findUnique({
                    where: { id: Number(req.params.id) }
                });
                if (!existingLead)
                    throw new HttpError_1.HttpError(404, "Lead não encontrado");
                const updatedLead = yield database_1.prisma.lead.update({
                    where: { id: Number(req.params.id) },
                    data: body
                });
                res.status(201).json(updatedLead);
            }
            catch (error) {
                next(error);
            }
        });
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const existingLead = yield database_1.prisma.lead.findUnique({
                    where: { id: Number(req.params.id) }
                });
                if (!existingLead)
                    throw new HttpError_1.HttpError(404, "Lead não encontrado ou já foi excluído!");
                const leads = yield database_1.prisma.lead.delete({
                    where: { id: Number(req.params.id) }
                });
                res.json(leads);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.LeadsController = LeadsController;
