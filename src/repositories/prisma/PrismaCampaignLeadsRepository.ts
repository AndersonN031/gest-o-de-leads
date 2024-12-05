import { LeadCampaign } from "@prisma/client"
import { prisma } from "../../database"
import { CampaignsLeadsRepository, findLeadsCampaignsParams, LeadsCampaignsWhereParams } from "../CampaignLeadsRepository"


export class PrismaLeadCampaignsRepository implements CampaignsLeadsRepository {
    async find(params: findLeadsCampaignsParams): Promise<LeadCampaign[]> {
        return prisma.leadCampaign.findMany({
            include: {
                campaign: true,
                lead: true
            },
            where: {
                campaignId: params.where?.campaignId,
                leadId: params.leadId,
                status: params.where?.status,

            }

        })
    }

    async count(where: LeadsCampaignsWhereParams): Promise<number> {
        return prisma.leadCampaign.count({
            where: {
                status: where?.status,
                campaign: {
                    id: where?.campaignId
                }
            }
        })
    }


    // findById(campaignId: number): Promise<LeadCampaign | null> {
    //     return prisma.leadCampaign.findUnique({ where: { campaignId } })
    // }

    // create(attributes: CreateLeadCampaignsAttributes): Promise<LeadCampaign> {
    //     return prisma.leadCampaign.create({ data: attributes })
    // }

    // updateById(id: number, attributes: Partial<CreateLeadCampaignsAttributes>): Promise<LeadCampaign> {
    //     return prisma.leadCampaign.update({ where: { id }, data: attributes })
    // }

    // deleteById(id: number): Promise<LeadCampaign | null> {
    //     return prisma.leadCampaign.delete({ where: { id } })
    // }
}