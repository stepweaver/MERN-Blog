const express = require('express');
const isAuthenticated = require('../../middlewares/isAuthenticated');
const planController = require('../../controllers/plans/planController');

//! Create instance of express router
const planRouter = express.Router();

//* Create plan
planRouter.post(
  '/create',
  isAuthenticated,
  planController.createPlan
);
//* List plans
planRouter.get('/', planController.getPlans);
//* Update plan
planRouter.put(
  '/:planId',
  isAuthenticated,
  planController.updatePlan
);
//* Get plan
planRouter.get('/:planId', planController.getPlan);
//* Delete plan
planRouter.delete(
  '/:planId',
  isAuthenticated,
  planController.deletePlan
);

module.exports = planRouter;
