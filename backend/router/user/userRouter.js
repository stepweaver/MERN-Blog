const express = require('express');
const userController = require('../../controllers/users/userController');

//! Create instance of express router
const userRouter = express.Router();

//* Create a new user
userRouter.post('/register', userController.register);
//* Login user
userRouter.post('/login', userController.login);
//* Google Auth
userRouter.get('/auth/google', userController.googleAuth);
//* Google Auth Callback
userRouter.get('/auth/google/callback', userController.googleAuthCallback);
//* Check if user is authenticated
userRouter.get('/checkAuthenticated', userController.checkAuthenticated);

module.exports = userRouter;