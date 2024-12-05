import { Router } from "express";
import { campaignsController, campaignsLeadsController, groupsController, leadsController, leadsGroupsController } from "./container";

const router = Router();

router.get('/leads', leadsController.index);
router.post('/leads', leadsController.create);
router.get('/leads/:id', leadsController.show);
router.put('/leads/:id', leadsController.update);
router.delete('/leads/:id', leadsController.delete)

router.get('/groups', groupsController.index);
router.post('/groups', groupsController.create);
router.get('/groups/:id', groupsController.show);
router.delete('/groups/:id', groupsController.delete);
router.put('/groups/:id', groupsController.update);

router.get('/groups/:groupId/leads', leadsGroupsController.getLeadToGroup);
router.post('/groups/:groupId/leads', leadsGroupsController.addLeadToGroup)
router.delete('/groups/:groupId/leads/:leadId', leadsGroupsController.deleteLeadToGroup)

router.get('/campaigns', campaignsController.index);
router.post('/campaigns', campaignsController.create);
router.get('/campaigns/:id', campaignsController.show);
router.put('/campaigns/:id', campaignsController.update);
router.delete('/campaigns/:id', campaignsController.delete);

router.get('/campaigns/:campaignId/leads', campaignsLeadsController.getLeads);
router.post('/campaigns/:campaignId/leads', campaignsLeadsController.addLead);
router.put('/campaigns/:campaignId/leads/:leadId', campaignsLeadsController.updateLeadStatus);
router.delete('/campaigns/:campaignId/leads/:leadId', campaignsLeadsController.removeLead);

export { router }