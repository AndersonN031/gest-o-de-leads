import { Campaign } from "@prisma/client";
import { CampaignsRepository, CreateCampaignsAttributes } from "../CampaignsRepository";
import { prisma } from "../../database";

export class PrismaCampaignsRepository implements CampaignsRepository {
    find(): Promise<Campaign[]> {
        return prisma.campaign.findMany()
    }

    findById(id: number): Promise<Campaign | null> {
        return prisma.campaign.findUnique({ where: { id } })
    }

    create(attributes: CreateCampaignsAttributes): Promise<Campaign> {
        return prisma.campaign.create({ data: attributes })
    }

    updateById(id: number, attributes: Partial<CreateCampaignsAttributes>): Promise<Campaign> {
        return prisma.campaign.update({ where: { id }, data: attributes })
    }

    deleteById(id: number): Promise<Campaign | null> {
        return prisma.campaign.delete({ where: { id } })
    }
}