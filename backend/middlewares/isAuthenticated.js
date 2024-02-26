const passport = require('passport');

const isAuthenticated = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (error, user, info) => {
    if (error || !user) {
      res.status(401).json({
        message: info ? info?.message : 'Unauthorized. No token found',
        error: error ? error?.message : undefined
      });
    }
    // Set the user
    req.user = user?._id;
    return next();
  })(req, res, next);
};

module.exports = isAuthenticated;
