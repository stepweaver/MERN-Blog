const express = require('express');
const isAuthenticated = require('../../middlewares/isAuthenticated');
const stripePaymentController = require('../../controllers/stripePayment/stripePaymentController');

//! Create instance of express router
const stripePaymentRouter = express.Router();

//* Create payment
stripePaymentRouter.post(
  '/checkout',
  isAuthenticated,
  stripePaymentController.payment
);
//* List plans
// stripePaymentRouter.get('/', stripePaymentController.getPlans);

module.exports = stripePaymentRouter;
