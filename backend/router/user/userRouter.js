const express = require('express');
const userController = require('../../controllers/users/userController');
const isAuthenticated = require('../../middlewares/isAuthenticated');

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
//* Logout user
userRouter.post('/logout', userController.logout);
//* Profile
userRouter.get('/profile', isAuthenticated, userController.profile);

module.exports = userRouter;
