const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const Plan = require('../../models/Plan/Plan');

//* Stripe Payment Controller
const stripePaymentController = {
  payment: asyncHandler(async (req, res) => {
    //! Get the plan Id
    const { subscriptionId } = req.body;
    //! Validate the plan
    if (!mongoose.isValidObjectId(subscriptionId)) {
      return res.json({ message: 'Invalid subscription plan' });
    }
    //! Find the plan
    const plan = await Plan.findById(subscriptionId);
    if (!plan) {
      return res.json({ message: 'Plan not found' });
    }
    //! Get the user
    const user = req.user;
    //! Create payment intent
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: plan.price * 100,
        currency: 'usd',
        //! add metadata
        metadata: {
          userId: user?.toString(),
          userEmail: user?.email,
          subscriptionId
        }
      });
      res.json({
        clientSecret: paymentIntent.client_secret,
        userEmail: user?.email,
        subscriptionId
      });
    } catch (err) {
      res.json({ err });
    }
    //! Send the response
  })
};

module.exports = stripePaymentController;
