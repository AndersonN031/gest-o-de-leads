import { HttpError } from "../errors/HttpError";
import { CampaignsRepository, CreateCampaignsAttributes } from "../repositories/CampaignsRepository";

export class CampaignsService {
    constructor(private readonly campaignsService: CampaignsRepository) { }

    // params: name, description, startDate, endDate 
    async createCampaign(params: CreateCampaignsAttributes) {
        const newCampaign = await this.campaignsService.create(params);
        return newCampaign;
    }

    async getCampaignById(id: number) {
        const campaign = await this.campaignsService.findById(id);
        if (!campaign) throw new HttpError(404, "Campanha não encontrada!");
        return campaign;
    }

    async updateCampaign(campaignId: number, params: Partial<CreateCampaignsAttributes>) {
        const updatedCampaign = await this.campaignsService.updateById(campaignId, params)
        if (!updatedCampaign) throw new HttpError(404, "Campanha não encontrado!");
        return updatedCampaign;
    }

    async deleteCampaign(campaignId: number) {
        const deletedCampaign = await this.campaignsService.deleteById(campaignId);
        if (!deletedCampaign) throw new HttpError(404, "Campanha não encontrado!");
        return deletedCampaign;
    }
}