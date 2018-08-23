const passport = require('passport');
const GoogleStrategy = require('./googleStrategy');
const FacebookStrategy = require('./facebookStrategy');
import User from '../../models/user';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(GoogleStrategy);
passport.use(FacebookStrategy);

module.exports = passport;
