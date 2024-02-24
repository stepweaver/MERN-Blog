const express = require('express');
const userController = require('../../controllers/users/userController');

const userRouter = express.Router();

//! Register a new user
userRouter.post('/register', userController.register);

module.exports = userRouter;