const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../../models/User/User');

const userController = {
  //* @desc    Create a new user
  //* @route   POST /api/users/register
  //* @access  Public
  register: asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    const userExists = await User.findOne({ username, email });
    if (userExists) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userRegistered = await User.create({
      username,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      status: 'success',
      message: 'User created successfully',
      userRegistered
    });
  }),
  //* @desc    Login user
  //* @route   POST /api/users/login
  //* @access  Public
  login: asyncHandler(async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) return next(err);

      if (!user) {
        return res.status(401).json({ message: info.message });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000
      });
      res.json({
        status: 'success',
        message: 'User logged in successfully',
        username: user?.username,
        email: user?.email,
        _id: user?._id
      });
    })(req, res, next);
  }),
  //* @desc    Google Auth
  //* @route   POST /api/users/auth/google
  //* @access  Public
  googleAuth: passport.authenticate('google', {
    scope: ['profile']
  }),
  //* @desc    Google Auth Callback
  //* @route   GET /api/users/auth/google/callback
  //* @access  Public
  googleAuthCallback: asyncHandler(async (req, res, next) => {
    passport.authenticate(
      'google',
      {
        failureRedirect: '/login',
        session: false
      },
      (err, user, info) => {
        if (err) return next(err);

        if (!user) {
          return res.redirect('http://*localhost:5173/googl-login-error');
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: '3d'
        });

        res.cookie('token', token, {
          httpOnly: true,
          secure: false,
          sameSite: 'strict',
          maxAge: 24 * 60 * 60 * 1000
        });

        res.redirect('http://*localhost:5173/dashboard');
      }
    )(req, res, next);
  }),
  //* @desc    Check if user is authenticated
  //* @route   GET /api/users/authenticated
  //* @access  Private
  checkAuthenticated: asyncHandler(async (req, res) => {
    const token = req.cookies['token'];
    if (!token) {
      return res.status(401).json({ isAuthenticated: false });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // find user by id
      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        return res.status(401).json({ isAuthenticated: false });
      } else {
        return res.status(200).json({
          isAuthenticated: true,
          _id: user?._id,
          username: user?.username,
          profilePicture: user?.profilePicture
        });
      }
    } catch (err) {
      return res.status(401).json({ isAuthenticated: false, err });
    }
  })
};

module.exports = userController;
