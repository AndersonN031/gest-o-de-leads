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
exports.GroupsController = void 0;
const database_1 = require("../database");
const GroupsRequestSchema_1 = require("./schemas/GroupsRequestSchema");
const HttpError_1 = require("../errors/HttpError");
class GroupsController {
    constructor() {
        this.index = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const groups = yield database_1.prisma.group.findMany();
                res.json(groups);
            }
            catch (error) {
                next(error);
            }
        });
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const body = GroupsRequestSchema_1.CreateGroupsRequestSchema.parse(req.body);
                const newGroup = yield database_1.prisma.group.create({ data: body });
                res.status(201).json(newGroup);
            }
            catch (error) {
                next(error);
            }
        });
        this.show = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const group = yield database_1.prisma.group.findUnique({
                    where: { id: Number(req.params.id) },
                    include: { leads: true }
                });
                if (!group)
                    throw new HttpError_1.HttpError(404, "Grupo não encontrado");
                res.status(200).json(group);
            }
            catch (error) {
                next(error);
            }
        });
        this.update = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const body = GroupsRequestSchema_1.UpdateGroupsRequestSchema.parse(req.body);
                const groupExists = yield database_1.prisma.group.findUnique({ where: { id } });
                if (!groupExists)
                    throw new HttpError_1.HttpError(404, "Grupo não encontrado");
                const updatedGruop = yield database_1.prisma.group.update({
                    data: body,
                    where: { id }
                });
                res.status(201).json({ updatedGruop });
            }
            catch (error) {
                next(error);
            }
        });
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const groupExists = yield database_1.prisma.group.findUnique({ where: { id } });
                if (!groupExists)
                    throw new HttpError_1.HttpError(404, "Grupo não encontrado");
                const deletedGroups = yield database_1.prisma.group.delete({ where: { id } });
                res.status(201).json({ deletedGroups });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.GroupsController = GroupsController;
