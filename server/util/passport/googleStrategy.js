const GoogleStrategy = require('passport-google-oauth20').Strategy;
import User from '../../models/user';
import keys from '../../config';

const strategy = new GoogleStrategy(
  {
    clientID: keys.googleID,
    clientSecret: keys.googleSecret,
    callbackURL: 'http://localhost:8000/auth/google/callback',
  },
  function (token, tokenSecret, profile, done) {
   // testing
    // console.log('===== GOOGLE PROFILE =======')
    // console.log(profile)
    // console.log('======== END ===========')
   // code
    const { id, displayName, _json, emails } = profile;
    User.findOne({ 'google.googleId': id }, (err, userMatch) => {
     // handle errors here:
      if (err) {
        // console.log('Error!! trying to find user with googleId')
        // console.log(err)
        return done(null, false);
      }
     // if there is already someone with that googleId
      if (userMatch) {
        return done(null, userMatch);
      } if (!userMatch) {
       // if no user in our db, create a new user with that googleId
       // console.log('====== PRE SAVE =======')
       // console.log(id)
       // console.log(profile)
       // console.log('====== post save ....')
        const newGoogleUser = new User({
          'google.googleId': id,
          name: displayName,
          email: emails[0].value,
          avatar: _json.image.url,
        });
       // save this user
        newGoogleUser.save((err1, savedUser) => {
          if (err1) {
            // console.log('Error!! saving the new google user');
            // console.log(err1);
            return done(null, false);
          } if (!err1) {
            return done(null, savedUser);
          }
        }); // closes newGoogleUser.save
      }
    }); // closes User.findONe
  }
);


module.exports = strategy;
