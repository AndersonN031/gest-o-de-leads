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
const GroupsRequestSchema_1 = require("./schemas/GroupsRequestSchema");
const HttpError_1 = require("../errors/HttpError");
class GroupsController {
    constructor(groupsRepository) {
        this.groupsRepository = groupsRepository;
        this.index = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const groups = yield this.groupsRepository.find();
                res.json(groups);
            }
            catch (error) {
                next(error);
            }
        });
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const body = GroupsRequestSchema_1.CreateGroupsRequestSchema.parse(req.body);
                const newGroup = yield this.groupsRepository.create(body);
                res.status(201).json(newGroup);
            }
            catch (error) {
                next(error);
            }
        });
        this.show = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const group = yield this.groupsRepository.findById(Number(req.params.id));
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
                const updatedGroup = yield this.groupsRepository.updateByid(id, body);
                if (!updatedGroup)
                    throw new HttpError_1.HttpError(404, "Grupo não encontrado");
                res.status(201).json({ updatedGroup: updatedGroup });
            }
            catch (error) {
                next(error);
            }
        });
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const deletedGroups = yield this.groupsRepository.deleteById(id);
                if (!deletedGroups)
                    throw new HttpError_1.HttpError(404, "Grupo não encontrado");
                res.status(201).json({ deletedGroups });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.GroupsController = GroupsController;
