import { Campaign } from "@prisma/client";
import { AddLeadToCampaignAttributes, CampaignsRepository, CreateCampaignsAttributes } from "../CampaignsRepository";
import { prisma } from "../../database";

export class PrismaCampaignsRepository implements CampaignsRepository {
    find(): Promise<Campaign[]> {
        return prisma.campaign.findMany()
    }

    findById(id: number): Promise<Campaign | null> {
        return prisma.campaign.findUnique({
            where: { id },
            include: {
                leads: {
                    include: {
                        lead: true
                    }
                }
            }
        })
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

    async addLead(attributes: AddLeadToCampaignAttributes): Promise<void> {
        await prisma.leadCampaign.create({ data: attributes })
    }

    async updatedLeadStatus(attributes: AddLeadToCampaignAttributes): Promise<void> {
        await prisma.leadCampaign.update({
            data: { status: attributes.status },
            where: {
                leadId_campaignId: {
                    campaignId: attributes.campaignId,
                    leadId: attributes.leadId
                }
            }
        })
    }

    async removeLead(campaignId: number, leadId: number): Promise<void> {
        await prisma.leadCampaign.delete({
            where: {
                leadId_campaignId: { campaignId, leadId }
            }
        })
    }
}