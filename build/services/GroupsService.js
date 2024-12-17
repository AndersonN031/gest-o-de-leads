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
exports.GroupsService = void 0;
const HttpError_1 = require("../errors/HttpError");
class GroupsService {
    constructor(groupsRepository) {
        this.groupsRepository = groupsRepository;
    }
    createGroup(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const newGroup = yield this.groupsRepository.create(params);
            return newGroup;
        });
    }
    getGroupById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const group = yield this.groupsRepository.findById(Number(id));
            if (!group)
                throw new HttpError_1.HttpError(404, "Grupo não encontrado");
            return group;
        });
    }
    updateGroup(groupId, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedGroup = yield this.groupsRepository.updateByid(groupId, params);
            if (!updatedGroup)
                throw new HttpError_1.HttpError(404, "Grupo não encontrado");
            return updatedGroup;
        });
    }
    deleteGroup(groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedGroups = yield this.groupsRepository.deleteById(groupId);
            if (!deletedGroups)
                throw new HttpError_1.HttpError(404, "Grupo não encontrado");
            return deletedGroups;
        });
    }
}
exports.GroupsService = GroupsService;
