const passport = require('passport');
const User = require('../models/User/User');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

//! Configure passport local strategy
passport.use(
  new LocalStrategy(
    {
      uernameField: 'username' // username/email
    },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) {
          return done(null, false, { message: 'User not found' });
        }
        // verify password
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Invalid credentials' });
        }
      } catch (err) {
        console.error(err);
        return done(err);
      }
    }
  )
);

module.exports = passport;
