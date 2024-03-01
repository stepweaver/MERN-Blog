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
//* Verify payment
stripePaymentRouter.get('/verify/:paymentId', stripePaymentController.verify);

module.exports = stripePaymentRouter;
