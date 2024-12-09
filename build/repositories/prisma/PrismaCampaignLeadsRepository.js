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
exports.PrismaLeadCampaignsRepository = void 0;
const database_1 = require("../../database");
class PrismaLeadCampaignsRepository {
    find(params) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            return database_1.prisma.leadCampaign.findMany({
                where: {
                    campaignId: (_a = params.where) === null || _a === void 0 ? void 0 : _a.campaignId,
                    status: (_b = params.where) === null || _b === void 0 ? void 0 : _b.status,
                },
                skip: params.offset,
                take: params.limit,
                include: {
                    campaign: (_c = params.include) === null || _c === void 0 ? void 0 : _c.groups,
                    lead: (_d = params.include) === null || _d === void 0 ? void 0 : _d.campaigns
                }
            });
        });
    }
    count(where) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prisma.leadCampaign.count({
                where: {
                    status: where === null || where === void 0 ? void 0 : where.status,
                    campaign: {
                        id: where === null || where === void 0 ? void 0 : where.campaignId
                    },
                }
            });
        });
    }
}
exports.PrismaLeadCampaignsRepository = PrismaLeadCampaignsRepository;
