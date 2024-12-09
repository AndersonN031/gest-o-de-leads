"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaGroupsRepository = void 0;
const database_1 = require("../../database");
class PrismaGroupsRepository {
    find() {
        return database_1.prisma.group.findMany();
    }
    findById(id) {
        return database_1.prisma.group.findUnique({ where: { id } });
    }
    create(attributes) {
        return database_1.prisma.group.create({ data: attributes });
    }
    updateByid(id, attributes) {
        return database_1.prisma.group.update({ where: { id }, data: attributes });
    }
    deleteById(id) {
        return database_1.prisma.group.delete({ where: { id } });
    }
    addLead(groupId, leadId) {
        return database_1.prisma.group.update({
            where: {
                id: groupId,
            },
            data: {
                leads: {
                    connect: { id: leadId },
                },
            },
            include: { leads: true }
        });
    }
    removeLead(groupId, leadId) {
        return database_1.prisma.group.update({
            where: { id: groupId },
            data: {
                leads: {
                    disconnect: { id: leadId },
                },
            },
            include: { leads: true }
        });
    }
}
exports.PrismaGroupsRepository = PrismaGroupsRepository;
