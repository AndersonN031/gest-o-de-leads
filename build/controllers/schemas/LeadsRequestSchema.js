"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLeadRequestSchema = exports.CreateLeadRequestSchema = exports.GetLeadsRequestSchema = void 0;
const zod_1 = require("zod");
const LeadStatusSchema = zod_1.z.enum([
    "New",
    "Contacted",
    "Qualified",
    "Unresponsive",
    "Disqualified",
    "Archived"
]);
exports.GetLeadsRequestSchema = zod_1.z.object({
    page: zod_1.z.string().optional(),
    pageSize: zod_1.z.string().optional(),
    name: zod_1.z.string().optional(),
    status: LeadStatusSchema.optional(),
    sortBy: zod_1.z.enum(["asc", "desc", "createdAt"]).optional(),
    order: zod_1.z.enum(["asc", "desc"]).optional()
});
const CreateLeadRequestSchema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string(),
    phone: zod_1.z.string(),
    status: LeadStatusSchema.optional()
});
exports.CreateLeadRequestSchema = CreateLeadRequestSchema;
const UpdateLeadRequestSchema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string(),
    phone: zod_1.z.string(),
    status: LeadStatusSchema.optional()
});
exports.UpdateLeadRequestSchema = UpdateLeadRequestSchema;
