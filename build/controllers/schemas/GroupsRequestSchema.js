"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateGroupsRequestSchema = exports.CreateGroupsRequestSchema = void 0;
const zod_1 = require("zod");
exports.CreateGroupsRequestSchema = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string()
});
exports.UpdateGroupsRequestSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    description: zod_1.z.string().optional()
});
