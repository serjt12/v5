const GoogleStrategy = require('passport-google-oauth20').Strategy;
import User from '../../models/user';
import keys from '../../config';
const sendgrid = require('@sendgrid/mail');
sendgrid.setApiKey(keys.sendgridKey);
import crypto from 'crypto';

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
        const seed = crypto.randomBytes(20);
        const authToken = crypto.createHash('sha1').update(seed + emails[0].value).digest('hex');
        const newGoogleUser = new User({
          'google.googleId': id,
          name: displayName,
          email: emails[0].value,
          avatar: _json.image.url,
          authToken,
        });
       // save this user
        newGoogleUser.save((err1, savedUser) => {
          if (err1) {
            // console.log('Error!! saving the new google user');
            // console.log(err1);
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
        }); // closes newGoogleUser.save
      }
    }); // closes User.findONe
  }
);


module.exports = strategy;
