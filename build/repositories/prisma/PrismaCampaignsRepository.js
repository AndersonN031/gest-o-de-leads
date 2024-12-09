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
exports.PrismaCampaignsRepository = void 0;
const database_1 = require("../../database");
class PrismaCampaignsRepository {
    find() {
        return database_1.prisma.campaign.findMany();
    }
    findById(id) {
        return database_1.prisma.campaign.findUnique({
            where: { id },
            include: {
                leads: {
                    include: {
                        lead: true
                    }
                }
            }
        });
    }
    create(attributes) {
        return database_1.prisma.campaign.create({ data: attributes });
    }
    updateById(id, attributes) {
        return database_1.prisma.campaign.update({ where: { id }, data: attributes });
    }
    deleteById(id) {
        return database_1.prisma.campaign.delete({ where: { id } });
    }
    addLead(attributes) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.prisma.leadCampaign.create({ data: attributes });
        });
    }
    updatedLeadStatus(attributes) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.prisma.leadCampaign.update({
                data: { status: attributes.status },
                where: {
                    leadId_campaignId: {
                        campaignId: attributes.campaignId,
                        leadId: attributes.leadId
                    }
                }
            });
        });
    }
    removeLead(campaignId, leadId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.prisma.leadCampaign.delete({
                where: {
                    leadId_campaignId: { campaignId, leadId }
                }
            });
        });
    }
}
exports.PrismaCampaignsRepository = PrismaCampaignsRepository;
