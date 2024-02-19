const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reference: {
      type: String,
      required: true
    },
    currency: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    subscriptionPlan: {
      // use object id
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Plan',
      required: true
    },
    amount: {
      type: Number,
      default: 0
    },
    monthlyRequestCount: {
      type: Number
    }
  },
  { timestamps: true }
);

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
