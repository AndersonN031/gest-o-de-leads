import { CampaignController } from "./controllers/CampaignController";
import { CampaignLeadsController } from "./controllers/CampaignLeadsController";
import { GroupsController } from "./controllers/GroupsController";
import { LeadsController } from "./controllers/LeadsController";
import { LeadsGroupsController } from "./controllers/LeadsGroupsController";
import { PrismaLeadCampaignsRepository } from "./repositories/prisma/PrismaCampaignLeadsRepository";
import { PrismaCampaignsRepository } from "./repositories/prisma/PrismaCampaignsRepository";
import { PrismaGroupsRepository } from "./repositories/prisma/PrismaGroupsRepository";
import { PrismaLeadsRepository } from "./repositories/prisma/PrismaLeadsRepository";

export const leadsRepository = new PrismaLeadsRepository();
export const groupsRepository = new PrismaGroupsRepository();
export const campaignsRepository = new PrismaCampaignsRepository()
export const campaignsLeadsRepository = new PrismaLeadCampaignsRepository();

export const leadsController = new LeadsController(leadsRepository);
export const groupsController = new GroupsController(groupsRepository);
export const leadsGroupsController = new LeadsGroupsController(groupsRepository, leadsRepository);
export const campaignsController = new CampaignController(campaignsRepository);
export const campaignsLeadsController = new CampaignLeadsController(campaignsLeadsRepository);