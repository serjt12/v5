import User from '../models/user';
import Like from '../models/like';
import Travel from '../models/travel';
import keys from '../config';
// Create authenticated Authy and Twilio API clients
const authy = require('authy')(keys.authyKey);
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

/* verify code */
export function confirmCode(req, res) {
  const _id = req.body.user.userID;
  const { code } = req.body.user;
  User.findById({ _id }, (err, userMatch) => {
    // eslint-disable-next-line
    authy.phones().verification_check(userMatch.cellphone, '57', code, function (err1, res1) {
      if (err1) return res.json(err1);
      User.findOneAndUpdate({ _id }, {
        $set: { confirmed: true },
      }, (err2, user) => {
        if (err2) return res.json(err2);
        res.status(200).json({ msgCellVerify: 'Tu numero celular ha sido confirmado' });
      });
    });
  })
}
/* verify a user cellphone */
export function verifyCell(req, res) {
  const { code, cellphone } = req.body.user;
  User.update({ cellphone }, (err, userMatch) => {
    if (userMatch) {
      // eslint-disable-next-line
      authy.phones().verification_start(cellphone, code, { locale: 'es', code_length: '4' }, function (err1, res1) {
        if (err1) return res.json(err1);
        res.status(200).json({ msgConfirm: 'Verifica el codigo que ha sido enviado a tu celular' });
      });
    }
  });
}
