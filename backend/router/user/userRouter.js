const express = require('express');
const userController = require('../../controllers/users/userController');

//! Create instance of express router
const userRouter = express.Router();

//* Register user
userRouter.post('/register', userController.register);
//* Login user
userRouter.post('/login', userController.login);

module.exports = userRouter;