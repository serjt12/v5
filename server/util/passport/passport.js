const passport = require('passport');
const GoogleStrategy = require('./googleStrategy');
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

module.exports = passport;
