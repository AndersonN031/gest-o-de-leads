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
class GroupsController {
    constructor(groupsRepository, groupsService) {
        this.groupsRepository = groupsRepository;
        this.groupsService = groupsService;
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
                const newGroup = yield this.groupsService.createGroup(body);
                res.status(201).json(newGroup);
            }
            catch (error) {
                next(error);
            }
        });
        this.show = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const group = yield this.groupsService.getGroupById(+req.params.id);
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
                const updatedGroup = yield this.groupsService.updateGroup(id, body);
                res.status(201).json({ updatedGroup: updatedGroup });
            }
            catch (error) {
                next(error);
            }
        });
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const deletedGroup = yield this.groupsService.deleteGroup(id);
                res.status(201).json({ deletedGroup });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.GroupsController = GroupsController;
