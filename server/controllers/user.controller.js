import User from '../models/user';
import Like from '../models/like';
import Travel from '../models/travel';
import keys from '../config';
const sendgrid = require('@sendgrid/mail');
sendgrid.setApiKey(keys.sendgridKey);

// export function addUser(req, res) {
//   const { cellphone, password } = req.body.user;
//   User.findOne({ 'local.cellphone': cellphone }, (err, userMatch) => {
//     if (userMatch) {
//       return res.json({
//         error: `El numero ${cellphone} ya esta registrado`,
//       });
//     }
//     const newUser = new User({
//       cellphone,
//       'local.cellphone': cellphone,
//       'local.password': password,
//     });
//     newUser.save((err1, userInfo) => {
//       if (err1) return res.json(err1);
//       return res.json({ userInfo });
//     });
//   });
// }

/* UPDATE a user */
export function updateUser(req, res, next) {
  // eslint-disable-next-line
  User.findByIdAndUpdate(req.params.userID, req.body.user, { new: true }, function (err, user) {
    if (err) return next(err);
    res.json({ userInfo: user });
  });
}

/* RATE a user */
export function rateUser(req, res, next) {
  const { travel, rateValue, passenger } = req.body.like;
  // eslint-disable-next-line
  Travel.findById({ _id: travel }, function (err, travelInfo) {
    if (err) return next(err);
    const author = travelInfo.author;
    const like = new Like({
      passenger,
      travel,
      like: true,
      value: rateValue,
      dateCreated: new Date(),
    });
    like.save((err1, likeInfo) => {
      if (err1) return res.json(err1);
      User.update({ _id: author },
        {
          $inc: { rateCount: 1, rateValue },
          $push: { likes: likeInfo._id },
        },
        /* eslint prefer-arrow-callback: [ "error", { "allowNamedFunctions": true } ] */
        function updateUserLike(err2, userInfo) {
          if (err2) return next(err2);
          res.status(200);
          return userInfo;
        });
      return res.json({ msglike: 'Gracias por tu calificacion!' });
    });
  });
}

/* verify a user email */
export function verifyEmail(req, res, next) {
  const token = req.query.token;
  const redirectURL = 'http://localhost:8000/';
  User.update({ authToken: token },
    {
      $set: { confirmed: true } },
// eslint-disable-next-line
    function (err, user) {
      if (err) return next(err);
      res.status(200).redirect(redirectURL);
    });
}
