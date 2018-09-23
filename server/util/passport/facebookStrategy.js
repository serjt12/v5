const FacebookStrategy = require('passport-facebook').Strategy;
import User from '../../models/user';
import keys from '../../config';
const sendgrid = require('@sendgrid/mail');
sendgrid.setApiKey(keys.sendgridKey);
import crypto from 'crypto';

const strategy = new FacebookStrategy(
  {
    clientID: keys.facebookAppID,
    clientSecret: keys.facebookAppSecret,
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
        const seed = crypto.randomBytes(20);
        const authToken = crypto.createHash('sha1').update(seed + emails[0].value).digest('hex');
        const newFacebookUser = new User({
          'facebook.facebookId': id,
          name: displayName,
          email: emails[0].value,
          avatar: photos[0].value,
          authToken,
        });
       // save this user
        newFacebookUser.save((err1, savedUser) => {
          if (err1) {
            console.log('Error!! saving the new facebook user');
            console.log(err1);
            return done(null, false);
          } if (!err1) {
            const authenticationURL = `http://localhost:8000/api/verify_email?token=${savedUser.authToken}`;
            const msg = {
              to: savedUser.email,
              from: { email: 'TOBCITY@tobcity.com' },
              subject: 'Estas a un paso de comenzar a viajar con TOBCITY',
              text: 'Confirma Tu email y empieza a viajar con TOBCITY!',
              html: '<p>TOBCITY!</p>',
              templateId: 'd-a5d27df56c1244f09a92902bf1e420b8',
              dynamic_template_data: {
                subject: 'Confirma tu mail y viaja en TOBCITY!',
                name: displayName,
                url: authenticationURL,
              },
            };
            sendgrid.send(msg,
            function (err2, json) {
              if (err2) { return console.error(err2); }
            });
            return done(null, savedUser);
          }
        }); // closes newFacebookUser.save
      }
    }); // closes User.findONe
  });


module.exports = strategy;
