const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    profilePicture: {
      type: Object,
      default: {
        url: 'https://res.cloudinary.com/dp6wqzo2o/image/upload/v1702566305/anon_m9nm4m.webp'
      }
    },
    email: {
      type: String,
      required: false
    },
    password: {
      type: String,
      required: true
    },
    googleId: {
      type: String,
      required: false
    },
    authMethod: {
      type: String,
      enum: ['google', 'local', 'facebook', 'github'],
      required: true,
      default: 'local'
    },
    passwordResetToken: {
      type: String,
      default: null
    },
    accountVerificationToken: {
      type: String,
      default: null
    },
    accountVerificationExpires: {
      type: Date,
      default: null
    },
    accountVerificationToken: {
      type: String,
      default: null
    },
    accountVerificationExpires: {
      type: Date,
      default: null
    },
    passwordResetExpires: {
      type: Date,
      default: null
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
      }
    ],
    totalEarnings: {
      type: Number,
      default: 0
    },
    nextEarningDate: {
      type: Date,
      default: () =>
        new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
    },
    Plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Plan'
    },
    isEmailVerified: {
      type: Boolean,
      default: false
    },
    payments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment'
      }
    ],
    hasSelectedPlan: {
      type: Boolean,
      default: false
    },
    lastLogin: { type: Date, default: Date.now },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
