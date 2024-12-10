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
class LeadsController {
    constructor(leadsService) {
        this.leadsService = leadsService;
        this.index = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const query = LeadsRequestSchema_1.GetLeadsRequestSchema.parse(req.query);
                const { page = "1", pageSize = "10" } = query;
                const result = yield this.leadsService.getAllLeadsPaginated(Object.assign(Object.assign({}, query), { page: +page, pageSize: +pageSize }));
                res.json(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const body = LeadsRequestSchema_1.CreateLeadRequestSchema.parse(req.body);
                const newLead = yield this.leadsService.createLead(body);
                res.status(201).json(newLead);
            }
            catch (error) {
                next(error);
            }
        });
        this.show = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const lead = yield this.leadsService.getLeadById(+req.params.id);
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
                const updateLead = yield this.leadsService.updateLead(id, body);
                res.status(201).json(updateLead);
            }
            catch (error) {
                next(error);
            }
        });
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const deletedLead = yield this.leadsService.deleteLead(id);
                res.json(deletedLead);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.LeadsController = LeadsController;
