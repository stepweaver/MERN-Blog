const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../../models/User/User');

const userController = {
  // @desc    Create a new user
  // @route   POST /api/users/register
  // @access  Public
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
  // @desc    Login user
  // @route   POST /api/users/login
  // @access  Public
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
  })
};

module.exports = userController;
