const asyncHandler = require('express-async-handler');
const Plan = require('../../models/Plan/Plan');

const planController = {
  //* @desc    Create a plan
  //* @route   POST /api/plans
  //* @access  Private
  createPlan: asyncHandler(async (req, res) => {
    const { planName, features, price } = req.body;

    const planFound = await Plan.findOne({ planName });
    if (planFound) {
      throw new Error('Plan already exists');
    }

    const planCount = await Plan.countDocuments();
    if (planCount >= 2) {
      throw new Error('You can only create 2 plans');
    }

    const planCreated = await Plan.create({
      planName,
      features,
      price,
      user: req.user
    });

    res.json({
      status: 'success',
      message: 'Plan created successfully',
      planCreated
    });
  }),

  //* @desc    Get all plans
  //* @route   GET /api/plans
  //* @access  Public
  getPlans: asyncHandler(async (req, res) => {
    const plans = await Plan.find();
    res.json({
      status: 'success',
      message: 'Plans retrieved successfully',
      plans
    });
  }),

  //* @desc    Update a plan
  //* @route   PUT /api/plan/:planId
  //* @access  Private
  updatePlan: asyncHandler(async (req, res) => {
    // get the plan id from params
    const planId = req.params.planId;
    // find the pland by id and update
    const planFound = await Plan.findById(planId);
    if (!planFound) {
      throw new Error('Plan not found');
    }
    // update
    const planUpdated = await Plan.findByIdAndUpdate(
      planId,
      {
        planName: req.body.planName,
        features: req.body.features,
        price: req.body.price
      },
      { new: true }
    );
    res.json({
      status: 'success',
      message: 'Plan updated successfully',
      planUpdated
    });
  }),

  //* @desc    Get a plan by id
  //* @route   GET /api/plans/:planId
  //* @access  Public
  getPlan: asyncHandler(async (req, res) => {
    // get the plan id from params
    const planId = req.params.planId;
    // find the plan by id
    const planFound = await Plan.findById(planId);
    if (!planFound) {
      throw new Error('Plan not found');
    }
    res.json({
      status: 'success',
      message: 'Plan retrieved successfully',
      planFound
    });
  }),

  //* @desc    Delete a plan
  //* @route   DELETE /api/plans/:planId
  //* @access  Private
  deletePlan: asyncHandler(async (req, res) => {
    // get the plan id from params
    const planId = req.params.planId;
    // find the plan by id and delete
    const planFound = await Plan.findByIdAndDelete(planId);
    if (!planFound) {
      throw new Error('Plan not found');
    }
    res.json({
      status: 'success',
      message: 'Plan deleted successfully',
      planFound
    });
  })
};

module.exports = planController;
