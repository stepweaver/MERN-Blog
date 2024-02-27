const express = require('express');
const isAuthenticated = require('../../middlewares/isAuthenticated');
const categoryController = require('../../controllers/categories/categoryController');

//! Create instance of express router
const categoryRouter = express.Router();

//* Create category
categoryRouter.post(
  '/create',
  isAuthenticated,
  categoryController.createCategory
);
//* List categories
categoryRouter.get('/', categoryController.getCategories);
//* Update category
categoryRouter.put('/:categoryId', isAuthenticated, categoryController.updateCategory);
//* Get category
categoryRouter.get('/:categoryId', categoryController.getCategory);
//* Delete category
categoryRouter.delete('/:categoryId', isAuthenticated, categoryController.deleteCategory);

module.exports = categoryRouter;
