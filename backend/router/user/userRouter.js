const express = require('express');
const userController = require('../../controllers/users/userController');

//! Create instance of express router
const userRouter = express.Router();

//* Register user
userRouter.post('/register', userController.register);

module.exports = userRouter;