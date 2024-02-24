const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
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
  })
};

module.exports = userController;
