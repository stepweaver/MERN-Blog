const asyncHandler = require('express-async-handler');
const Category = require('../../models/Category/Category');

const categoryController = {
  //* @desc    Create a category
  //* @route   POST /api/categories
  //* @access  Private
  createCategory: asyncHandler(async (req, res) => {
    const { categoryName, description } = req.body;

    const categoryFound = await Category.findOne({ categoryName, description });
    if (categoryFound) {
      throw new Error('Category already exists');
    }

    const categoryCreated = await Category.create({
      categoryName,
      description,
      author: req.user
    });

    res.json({
      status: 'success',
      message: 'Category created successfully',
      categoryCreated
    });
  }),

  //* @desc    List all categories
  //* @route   GET /api/categories
  //* @access  Public
  getCategories: asyncHandler(async (req, res) => {
    const categories = await Category.find();
    res.json({
      status: 'success',
      message: 'Categories retrieved successfully',
      categories
    });
  }),

  //* @desc    Update a category
  //* @route   PUT /api/categories/:categoryId
  //* @access  Private
  updateCategory: asyncHandler(async (req, res) => {
    // get the category id from params
    const categoryId = req.params.categoryId;
    // find the category by id and update
    const categoryFound = await Category.findById(categoryId);
    if (!categoryFound) {
      throw new Error('Category not found');
    }
    // update
    const categoryUpdated = await Category.findByIdAndUpdate(
      categoryId,
      {
        categoryName: req.body.categoryName,
        description: req.body.description
      },
      { new: true }
    );
    res.json({
      status: 'success',
      message: 'Category updated successfully',
      categoryUpdated
    });
  }),

  //* @desc    Get a category by id
  //* @route   GET /api/categories/:categoryId
  //* @access  Public
  getCategory: asyncHandler(async (req, res) => {
    // get the category id from params
    const categoryId = req.params.categoryId;
    // find the category by id
    const categoryFound = await Category.findById(categoryId);
    if (!categoryFound) {
      throw new Error('Category not found');
    }
    res.json({
      status: 'success',
      message: 'Category retrieved successfully',
      categoryFound
    });
  }),

  //* @desc    Delete a category
  //* @route   DELETE /api/categories/:categoryId
  //* @access  Private
  deleteCategory: asyncHandler(async (req, res) => {
    // get the category id from params
    const categoryId = req.params.categoryId;
    // find the category by id and delete
    const categoryFound = await Category.findByIdAndDelete(categoryId);
    if (!categoryFound) {
      throw new Error('Category not found');
    }
    res.json({
      status: 'success',
      message: 'Category deleted successfully',
      categoryFound
    });
  })
};

module.exports = categoryController;
