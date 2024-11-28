import { Handler } from "express";
import { prisma } from "../database";
import { CreateGroupsRequestSchema, UpdateGroupsRequestSchema } from "./schemas/GroupsRequestSchema";
import { HttpError } from "../errors/HttpError";

export class GroupsController {
    index: Handler = async (req, res, next) => {
        try {
            const groups = await prisma.group.findMany()
            res.json(groups)
        } catch (error) {
            next(error);
        }
    }

    create: Handler = async (req, res, next) => {
        try {
            const body = CreateGroupsRequestSchema.parse(req.body);
            const newGroup = await prisma.group.create({ data: body });
            res.status(201).json(newGroup);
        } catch (error) {
            next(error);
        }
    }

    show: Handler = async (req, res, next) => {
        try {
            const group = await prisma.group.findUnique({
                where: { id: Number(req.params.id) },
                include: { leads: true }
            })

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

            const groupExists = await prisma.group.findUnique({ where: { id } })
            if (!groupExists) throw new HttpError(404, "Grupo não encontrado")

            const updatedGruop = await prisma.group.update({
                data: body,
                where: { id }
            })

            res.status(201).json({updatedGruop})

        } catch (error) {
            next(error);
        }
    }

    delete: Handler = async (req, res, next) => {
        try {
            const id = Number(req.params.id);
            const groupExists = await prisma.group.findUnique({ where: { id } })
            if (!groupExists) throw new HttpError(404, "Grupo não encontrado")
            const deletedGroups = await prisma.group.delete({ where: { id } })
            res.status(201).json({ deletedGroups })
        } catch (error) {
            next(error);
        }
    }

    
}