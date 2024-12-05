import { Handler } from "express";  
import { CreateGroupsRequestSchema, UpdateGroupsRequestSchema } from "./schemas/GroupsRequestSchema";
import { HttpError } from "../errors/HttpError";
import { GroupsRepository } from "../repositories/GroupsRepository";

export class GroupsController {
    constructor(private readonly groupsRepository: GroupsRepository) { }

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
            const newGroup = await this.groupsRepository.create(body)
            res.status(201).json(newGroup);
        } catch (error) {
            next(error);
        }
    }

    show: Handler = async (req, res, next) => {
        try {
            const group = await this.groupsRepository.findById(Number(req.params.id));
            if (!group) throw new HttpError(404, "Grupo não encontrado");
            res.status(200).json(group);
        } catch (error) {
            next(error);
        }
    }

    update: Handler = async (req, res, next) => {
        try {
            const id = Number(req.params.id);
            const body = UpdateGroupsRequestSchema.parse(req.body);

            const updatedGroup = await this.groupsRepository.updateByid(id, body)
            if(!updatedGroup) throw new HttpError(404, "Grupo não encontrado")

            res.status(201).json({ updatedGroup: updatedGroup })

        } catch (error) {
            next(error);
        }
    }

    delete: Handler = async (req, res, next) => {
        try {
            const id = Number(req.params.id);
            const deletedGroups = await this.groupsRepository.deleteById(id)
        if (!deletedGroups) throw new HttpError(404, "Grupo não encontrado")
            res.status(201).json({ deletedGroups })
        } catch (error) {
            next(error);
        }
    }


}