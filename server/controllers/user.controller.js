import User from '../models/user';

export function addUserTravel(req, res) {
  console.log('userID', req.params.userID)
  console.log('body', req.body)
}

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
  User.findByIdAndUpdate(req.params.userID, req.body.user, {new: true}, function (err, user) {
    if (err) return next(err);
    res.json({ userInfo: user });
  });
}
