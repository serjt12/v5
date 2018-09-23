import User from '../models/user';
import keys from '../config';
const sendgrid = require('@sendgrid/mail');
sendgrid.setApiKey(keys.sendgridKey);

export function addUser(req, res) {
  const { cellphone, password } = req.body.user;
  User.findOne({ 'local.cellphone': cellphone }, (err, userMatch) => {
    if (userMatch) {
      return res.json({
        error: `El numero ${cellphone} ya esta registrado`,
      });
    }
    const newUser = new User({
      cellphone,
      'local.cellphone': cellphone,
      'local.password': password,
    });
    newUser.save((err1, userInfo) => {
      if (err1) return res.json(err1);
      return res.json({ userInfo });
    });
  });
}

/* UPDATE a user */
export function updateUser(req, res, next) {
  User.findByIdAndUpdate(req.params.userID, req.body.user, { new: true }, function (err, user) {
    if (err) return next(err);
    res.json({ userInfo: user });
  });
}

/* RATE a user */
export function rateUser(req, res, next) {
  console.log(req.body)
  console.log(req.params)
  // User.findByIdAndUpdate(req.params.userID, req.body.user, { new: true }, function (err, user) {
  //   if (err) return next(err);
  //   res.json({ userInfo: user });
  // });
}

/* verify a user email */
export function verifyEmail(req, res, next) {
  const token = req.query.token
  const redirectURL = 'http://localhost:8000/'
  User.update({ authToken: token }, { $set: { confirmed: true } }, function (err, user) {
    if (err) return next(err);
    res.status(200).redirect(redirectURL);
  });
}
