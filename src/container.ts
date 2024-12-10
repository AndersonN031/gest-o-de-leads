import { CampaignController } from "./controllers/CampaignController";
import { CampaignLeadsController } from "./controllers/CampaignLeadsController";
import { GroupsController } from "./controllers/GroupsController";
import { LeadsController } from "./controllers/LeadsController";
import { LeadsGroupsController } from "./controllers/LeadsGroupsController";
import { PrismaCampaignsRepository } from "./repositories/prisma/PrismaCampaignsRepository";
import { PrismaGroupsRepository } from "./repositories/prisma/PrismaGroupsRepository";
import { PrismaLeadsRepository } from "./repositories/prisma/PrismaLeadsRepository";
import { LeadsService } from "./services/LeadsService";

export const leadsRepository = new PrismaLeadsRepository();
export const groupsRepository = new PrismaGroupsRepository();
export const campaignsRepository = new PrismaCampaignsRepository();

const leadsService = new LeadsService(leadsRepository);

export const leadsController = new LeadsController(leadsService);
export const groupsController = new GroupsController(groupsRepository);
export const leadsGroupsController = new LeadsGroupsController(groupsRepository, leadsRepository);
export const campaignsController = new CampaignController(campaignsRepository);
export const campaignsLeadsController = new CampaignLeadsController(campaignsRepository, leadsRepository);