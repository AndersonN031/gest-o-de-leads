"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.campaignsLeadsController = exports.campaignsController = exports.leadsGroupsController = exports.groupsController = exports.leadsController = exports.campaignsRepository = exports.groupsRepository = exports.leadsRepository = void 0;
const CampaignController_1 = require("./controllers/CampaignController");
const CampaignLeadsController_1 = require("./controllers/CampaignLeadsController");
const GroupsController_1 = require("./controllers/GroupsController");
const LeadsController_1 = require("./controllers/LeadsController");
const LeadsGroupsController_1 = require("./controllers/LeadsGroupsController");
const PrismaCampaignsRepository_1 = require("./repositories/prisma/PrismaCampaignsRepository");
const PrismaGroupsRepository_1 = require("./repositories/prisma/PrismaGroupsRepository");
const PrismaLeadsRepository_1 = require("./repositories/prisma/PrismaLeadsRepository");
const CampaignLeadsService_1 = require("./services/CampaignLeadsService");
const CampaignService_1 = require("./services/CampaignService");
const GroupsService_1 = require("./services/GroupsService");
const LeadsService_1 = require("./services/LeadsService");
exports.leadsRepository = new PrismaLeadsRepository_1.PrismaLeadsRepository();
exports.groupsRepository = new PrismaGroupsRepository_1.PrismaGroupsRepository();
exports.campaignsRepository = new PrismaCampaignsRepository_1.PrismaCampaignsRepository();
const leadsService = new LeadsService_1.LeadsService(exports.leadsRepository);
const groupsService = new GroupsService_1.GroupsService(exports.groupsRepository);
const campaignsService = new CampaignService_1.CampaignsService(exports.campaignsRepository);
const campaignLeadsService = new CampaignLeadsService_1.CampaignsLeadsService(exports.leadsRepository, exports.campaignsRepository);
exports.leadsController = new LeadsController_1.LeadsController(leadsService);
exports.groupsController = new GroupsController_1.GroupsController(exports.groupsRepository, groupsService);
exports.leadsGroupsController = new LeadsGroupsController_1.LeadsGroupsController(exports.groupsRepository, exports.leadsRepository);
exports.campaignsController = new CampaignController_1.CampaignController(exports.campaignsRepository, campaignsService);
exports.campaignsLeadsController = new CampaignLeadsController_1.CampaignLeadsController(exports.campaignsRepository, campaignLeadsService);
