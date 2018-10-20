const GoogleStrategy = require('passport-google-oauth20').Strategy;
import User from '../../models/user';
import keys from '../../config';
const sendgrid = require('@sendgrid/mail');
import crypto from 'crypto';
sendgrid.setApiKey(keys.sendgridKey);
// const accountSid = 'ACa497ac5ff81be239ab9872116847f1fe';
// const authToken = '5e9a37dcdfa426cfe471ccc8d764d5a1';
// const authyKey = 'AqBXgk9S5QLPzUw66R2Vy2BmBC0odxM0';
// const authy = require('authy')(authyKey);
// const twilioClient = require('twilio')(accountSid, authToken);

const strategy = new GoogleStrategy(
  {
    clientID: keys.googleID,
    clientSecret: keys.googleSecret,
    callbackURL: 'http://localhost:8000/auth/google/callback',
  },
  // eslint-disable-next-line
  function (token, tokenSecret, profile, done) {
   // testing
    // console.log('===== GOOGLE PROFILE =======')
    // console.log(profile)
    // console.log('======== END ===========')
   // code
    const { id, displayName, _json, emails } = profile;
    // eslint-disable-next-line
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
        const authyId = crypto.createHash('sha1').update(seed + emails[0].value).digest('hex');
        const newGoogleUser = new User({
          'google.googleId': id,
          name: displayName,
          email: emails[0].value,
          avatar: _json.image.url,
          authyId,
        });
       // save this user
       // eslint-disable-next-line
        newGoogleUser.save((err1, savedUser) => {
          if (err1) {
            // console.log('Error!! saving the new google user');
            // console.log(err1);
            return done(null, false);
          } if (!err1) {
            const linkURL = 'http://localhost:8000/';
            const msg = {
              to: savedUser.email,
              from: { email: 'TOBCITY@tobcity.com' },
              subject: 'Estas a un paso de comenzar a viajar con TOBCITY',
              text: 'Confirma Tu email y empieza a viajar con TOBCITY!',
              html: '<p>TOBCITY!</p>',
              templateId: 'd-a5d27df56c1244f09a92902bf1e420b8',
              dynamic_template_data: {
                subject: 'Bienvenido a viajar con TOBCITY!',
                name: displayName,
                url: linkURL,
              },
            };
            sendgrid.send(msg,
            // eslint-disable-next-line
            function (err2, json) {
              // eslint-disable-next-line
              if (err2) { return console.error(err2); }
              return done(null, json);
            });
            return done(null, savedUser);
          }
        }); // closes newGoogleUser.save
      }
    }); // closes User.findONe
  }
);


module.exports = strategy;
