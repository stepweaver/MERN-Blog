const passport = require('passport');
const User = require('../models/User/User');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

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

//! Google OAuth2.0
//! JWT-Options
const options = {
  jwtFromRequest: ExtractJWT.fromExtractors([
    (req) => {
      let token = null;
      if (req && req.cookies) {
        token = req.cookies['token'];
        return token;
      }
    }
  ]),
  secretOrKey: process.env.JWT_SECRET
};
//! JWT
passport.use(
  new JWTStrategy(options, async (userDecoded, done) => {
    try {
      const user = await User.findById(userDecoded.id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

module.exports = passport;
