import { Handler } from "express";
import { CreateGroupsRequestSchema, UpdateGroupsRequestSchema } from "./schemas/GroupsRequestSchema";
import { GroupsRepository } from "../repositories/GroupsRepository";
import { GroupsService } from "../services/GroupsService";

export class GroupsController {
    constructor(
        private readonly groupsRepository: GroupsRepository,
        private readonly groupsService: GroupsService
    ) { }


    index: Handler = async (req, res, next) => {
        try {
            const groups = await this.groupsRepository.find()
            res.json(groups)
        } catch (error) {
            next(error);
        }
    }

    create: Handler = async (req, res, next) => {
        try {
            const body = CreateGroupsRequestSchema.parse(req.body);
            const newGroup = await this.groupsService.createGroup(body)
            res.status(201).json(newGroup);
        } catch (error) {
            next(error);
        }
    }

    show: Handler = async (req, res, next) => {
        try {
            const group = await this.groupsService.getGroupById(+req.params.id)
            res.status(200).json(group);
        } catch (error) {
            next(error);
        }
    }

    update: Handler = async (req, res, next) => {
        try {
            const id = Number(req.params.id);
            const body = UpdateGroupsRequestSchema.parse(req.body);
            const updatedGroup = await this.groupsService.updateGroup(id, body)

            res.status(201).json({ updatedGroup: updatedGroup })
        } catch (error) {
            next(error);
        }
    }

    delete: Handler = async (req, res, next) => {
        try {
            const id = Number(req.params.id);
            const deletedGroup = await this.groupsService.deleteGroup(id);
            res.status(201).json({ deletedGroup })
        } catch (error) {
            next(error);
        }
    }


}