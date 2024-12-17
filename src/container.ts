import { CampaignController } from "./controllers/CampaignController";
import { CampaignLeadsController } from "./controllers/CampaignLeadsController";
import { GroupsController } from "./controllers/GroupsController";
import { LeadsController } from "./controllers/LeadsController";
import { LeadsGroupsController } from "./controllers/LeadsGroupsController";
import { PrismaCampaignsRepository } from "./repositories/prisma/PrismaCampaignsRepository";
import { PrismaGroupsRepository } from "./repositories/prisma/PrismaGroupsRepository";
import { PrismaLeadsRepository } from "./repositories/prisma/PrismaLeadsRepository";
import { CampaignsLeadsService } from "./services/CampaignLeadsService";
import { CampaignsService } from "./services/CampaignService";
import { GroupsService } from "./services/GroupsService";
import { LeadsService } from "./services/LeadsService";

export const leadsRepository = new PrismaLeadsRepository();
export const groupsRepository = new PrismaGroupsRepository();
export const campaignsRepository = new PrismaCampaignsRepository();

const leadsService = new LeadsService(leadsRepository);
const groupsService = new GroupsService(groupsRepository);
const campaignsService = new CampaignsService(campaignsRepository)
const campaignLeadsService = new CampaignsLeadsService(leadsRepository, campaignsRepository)

export const leadsController = new LeadsController(leadsService);
export const groupsController = new GroupsController(groupsRepository, groupsService);
export const leadsGroupsController = new LeadsGroupsController(groupsRepository, leadsRepository);
export const campaignsController = new CampaignController(campaignsRepository, campaignsService);
export const campaignsLeadsController = new CampaignLeadsController(campaignsRepository, campaignLeadsService);