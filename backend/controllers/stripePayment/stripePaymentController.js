const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const Plan = require('../../models/Plan/Plan');
const User = require('../../models/User/User');
const Payment = require('../../models/Payment/Payment');

const stripePaymentController = {
  //* @desc    Create payment intent
  //* @route   POST /api/stripe/checkout
  //* @access  Private
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
          subscriptionId
        }
      });

      res.json({
        clientSecret: paymentIntent.client_secret,
        subscriptionId,
        paymentIntent
      });
    } catch (err) {
      res.json({ err });
    }
    //! Send the response
  }),
  //* @desc    Verify payment
  //* @route   POST /api/stripe/verify
  //* @access  Private
  verify: asyncHandler(async (req, res) => {
    //! Get the payment Id
    const { paymentId } = req.params;
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);
    //! Check if the payment was successful
    if (paymentIntent.status !== 'succeeded') {
      //! Get the subscription Id and user Id from the metadata
      const metadata = paymentIntent?.metadata;
      const subscriptionId = metadata?.subscriptionId;
      const userId = metadata?.userId;
      //! Find the user
      const userFound = await User.findById(userId);
      if (!userFound) {
        return res.json({ message: 'User not found' });
      }
      //! Get the payment details
      const amount = paymentIntent?.amount / 100;
      const currency = paymentIntent?.currency;
      //! Create payment
      const newPayment = await Payment.create({
        user: userId,
        subscriptionPlan: subscriptionId,
        status: 'success',
        amount,
        currency,
        reference: paymentId
      });
      //! Update the user profile
      if (newPayment) {
        userFound.hasSelectedPlan = true;
        userFound.plan = subscriptionId;
        await userFound.save();
      }
      res.json({
        status: true,
        message: 'Payment verified, user updated successfully!',
        userFound
      });
    }
  })
};

module.exports = stripePaymentController;