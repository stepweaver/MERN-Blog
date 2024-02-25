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
      usernameField: 'username' // username/email
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
//! Google OAuth2.0
passport.use(
  new GoogleStrategy({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/api/users/auth/google/callback'
  }, async(accessToken, refreshToken, profile, done) => {
    try {
      // check if user already exists
      let user = await User.findOne({ googleId: profile.id })
      // destructuring profile object
      const { id, displayName, __json: {picture} } = profile;
      // check if email exists
      let email = '';
      if (Array.isArray(profile?.emails) && profile.emails.length > 0) {
        email = profile.emails[0].value;
      }
      // check if user exists
      if (!user) {
        user = await User.create({
          username: displayName,
          googleId: id,
          profilePicture: picture,
          authMethod: 'google',
          email
        })
      }
      done(null, user);
    } catch (err) {
      done(err, null)
    }
  })
)

module.exports = passport;
