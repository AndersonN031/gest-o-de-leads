import { HttpError } from "../errors/HttpError";
import { CreateGroupAttributes, GroupsRepository } from "../repositories/GroupsRepository";


export class GroupsService {
    constructor(private readonly groupsRepository: GroupsRepository) { }

    async createGroup(params: CreateGroupAttributes) {
        const newGroup = await this.groupsRepository.create(params)
        return newGroup
    }

    async getGroupById(id: number) {
        const group = await this.groupsRepository.findById(Number(id));
        if (!group) throw new HttpError(404, "Grupo não encontrado");
        return group;
    }

    async updateGroup(groupId: number, params: Partial<CreateGroupAttributes>) {
        const updatedGroup = await this.groupsRepository.updateByid(groupId, params);
        if (!updatedGroup) throw new HttpError(404, "Grupo não encontrado");   
        return updatedGroup;
    }

    async deleteGroup(groupId: number) {
        const deletedGroups = await this.groupsRepository.deleteById(groupId);
        if (!deletedGroups) throw new HttpError(404, "Grupo não encontrado");
        return deletedGroups;
    }
}