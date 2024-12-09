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
exports.PrismaLeadsRepository = void 0;
const database_1 = require("../../database");
class PrismaLeadsRepository {
    find(params) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
            let where = {
                name: {
                    contains: (_b = (_a = params.where) === null || _a === void 0 ? void 0 : _a.name) === null || _b === void 0 ? void 0 : _b.like,
                    equals: (_d = (_c = params.where) === null || _c === void 0 ? void 0 : _c.name) === null || _d === void 0 ? void 0 : _d.equals,
                    mode: (_f = (_e = params.where) === null || _e === void 0 ? void 0 : _e.name) === null || _f === void 0 ? void 0 : _f.mode,
                },
                status: (_g = params.where) === null || _g === void 0 ? void 0 : _g.status,
            };
            if ((_h = params.where) === null || _h === void 0 ? void 0 : _h.groupId) {
                where.groups = { some: { id: params.where.groupId } };
            }
            if ((_j = params.where) === null || _j === void 0 ? void 0 : _j.campaignId) {
                where.campaigns = { some: { campaignId: params.where.campaignId } };
            }
            return database_1.prisma.lead.findMany({
                where: {
                    groups: {
                        some: {
                            id: (_k = params.where) === null || _k === void 0 ? void 0 : _k.groupId
                        }
                    },
                    campaigns: {
                        some: {
                            campaignId: (_l = params.where) === null || _l === void 0 ? void 0 : _l.campaignId,
                        }
                    }
                },
                orderBy: { [(_m = params.sortBy) !== null && _m !== void 0 ? _m : "name"]: params.order },
                skip: params.offset,
                take: params.limit,
                include: {
                    groups: (_o = params.include) === null || _o === void 0 ? void 0 : _o.groups,
                    campaigns: (_p = params.include) === null || _p === void 0 ? void 0 : _p.campaigns,
                }
            });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prisma.lead.findUnique({
                where: { id },
                include: {
                    campaigns: true,
                    groups: true
                }
            });
        });
    }
    count(where) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            let prismaWhere = {
                name: {
                    contains: (_a = where === null || where === void 0 ? void 0 : where.name) === null || _a === void 0 ? void 0 : _a.like,
                    equals: (_b = where === null || where === void 0 ? void 0 : where.name) === null || _b === void 0 ? void 0 : _b.equals,
                    mode: (_c = where === null || where === void 0 ? void 0 : where.name) === null || _c === void 0 ? void 0 : _c.mode,
                },
                status: where === null || where === void 0 ? void 0 : where.status,
            };
            if (where === null || where === void 0 ? void 0 : where.groupId) {
                prismaWhere.groups = { some: { id: where.groupId } };
            }
            if (where === null || where === void 0 ? void 0 : where.campaignId) {
                prismaWhere.campaigns = { some: { campaignId: where.campaignId } };
            }
            return database_1.prisma.lead.count({ where: prismaWhere });
        });
    }
    create(attributes) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prisma.lead.create({ data: attributes });
        });
    }
    updateById(id, attributes) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prisma.lead.update({
                where: { id },
                data: attributes
            });
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.prisma.lead.delete({ where: { id } });
        });
    }
}
exports.PrismaLeadsRepository = PrismaLeadsRepository;
