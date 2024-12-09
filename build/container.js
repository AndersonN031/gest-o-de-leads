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
exports.leadsRepository = new PrismaLeadsRepository_1.PrismaLeadsRepository();
exports.groupsRepository = new PrismaGroupsRepository_1.PrismaGroupsRepository();
exports.campaignsRepository = new PrismaCampaignsRepository_1.PrismaCampaignsRepository();
exports.leadsController = new LeadsController_1.LeadsController(exports.leadsRepository);
exports.groupsController = new GroupsController_1.GroupsController(exports.groupsRepository);
exports.leadsGroupsController = new LeadsGroupsController_1.LeadsGroupsController(exports.groupsRepository, exports.leadsRepository);
exports.campaignsController = new CampaignController_1.CampaignController(exports.campaignsRepository);
exports.campaignsLeadsController = new CampaignLeadsController_1.CampaignLeadsController(exports.campaignsRepository, exports.leadsRepository);
