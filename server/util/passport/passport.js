const passport = require('passport');
const GoogleStrategy = require('./googleStrategy');
const FacebookStrategy = require('./facebookStrategy');
const LocalStrategy = require('./localStrategy');
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
passport.use(LocalStrategy);

module.exports = passport;
