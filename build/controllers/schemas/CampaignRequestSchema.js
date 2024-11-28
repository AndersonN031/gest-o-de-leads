"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLeadStatusRequestSchema = exports.AddLeadRequestSchema = exports.GetCampaignLeadsRequestSchema = exports.UpdateCampaignRequestSchema = exports.CreateCampaignRequestSchema = void 0;
const zod_1 = require("zod");
exports.CreateCampaignRequestSchema = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    startDate: zod_1.z.coerce.date(),
    endDate: zod_1.z.coerce.date().optional()
});
exports.UpdateCampaignRequestSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    startDate: zod_1.z.coerce.date().optional(),
    endDate: zod_1.z.coerce.date().optional()
});
const LeadCampaignStatusSchema = zod_1.z.enum([
    "New",
    "Engaged",
    "folloUp_Scheduled",
    "Contacted",
    "Qualified",
    "Converted",
    "Unresposnvive",
    "Disqualified",
    "Re_Engaged",
    "Opted_Out"
]);
exports.GetCampaignLeadsRequestSchema = zod_1.z.object({
    page: zod_1.z.string().optional(),
    pageSize: zod_1.z.string().optional(),
    name: zod_1.z.string().optional(),
    status: LeadCampaignStatusSchema.optional(),
    sortBy: zod_1.z.enum(["name", "createdAt"]).optional(),
    order: zod_1.z.enum(["asc", "desc"]).optional()
});
exports.AddLeadRequestSchema = zod_1.z.object({
    leadId: zod_1.z.number(),
    status: LeadCampaignStatusSchema.optional()
});
exports.UpdateLeadStatusRequestSchema = zod_1.z.object({
    status: LeadCampaignStatusSchema
});
