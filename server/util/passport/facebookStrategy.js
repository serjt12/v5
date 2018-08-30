const FacebookStrategy = require('passport-facebook').Strategy;
import User from '../../models/user';
import keys from '../../config';

const strategy = new FacebookStrategy(
  {
    clientID: '299960864082504',
    clientSecret: '16ddbe32c735ea78b675491057652efa',
    callbackURL: 'http://localhost:8000/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'photos', 'email'],
    enableProof: true,
  },
  function (accessToken, refreshToken, profile, done) {
   // testing
    // console.log('===== FACEBOOK PROFILE =======')
    // console.log(profile)
    // console.log('======== END ===========')
   // code
    const { id, displayName, photos, emails } = profile;
    User.findOne({ 'facebook.facebookId': id }, (err, userMatch) => {
     // handle errors here:
      if (err) {
        // console.log('Error!! trying to find user with facebookId')
        // console.log(err)
        return done(null, false);
      }
     // if there is already someone with that facebookId
      if (userMatch) {
        return done(null, userMatch);
      } if (!userMatch) {
       // if no user in our db, create a new user with that facebookId
       // console.log('====== PRE SAVE =======')
       // console.log(photos[0].value)
       // console.log(profile)
       // console.log('====== post save ....')
        const newFacebookUser = new User({
          'facebook.facebookId': id,
          name: displayName,
          email: emails[0].value,
          avatar: photos[0].value,
        });
       // save this user
        newFacebookUser.save((err1, savedUser) => {
          if (err1) {
            // console.log('Error!! saving the new facebook user');
            // console.log(err1);
            return done(null, false);
          } if (!err1) {
            return done(null, savedUser);
          }
        }); // closes newFacebookUser.save
      }
    }); // closes User.findONe
  });


module.exports = strategy;
