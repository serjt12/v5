import User from '../models/user';

export function addUserTravel(req, res) {
  console.log('REQ', req)
  console.log('RES', res)
}

export function addUser(req, res) {
  const { cellphone, password } = req.body.user;
  User.findOne({ 'local.cellphone': cellphone }, (err, userMatch) => {
    if (userMatch) {
      return res.json({
        error: `Lo sentimos pero el numero ${cellphone} ya esta registrado`,
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























// // import User from '../models/user';
// //
// export function addUser(req, res) {
//   if (!req.body.user.Id || !req.body.user.name || !req.body.user.email || !req.body.user.avatar) {
//     res.status(403).end();
//   }
//   const currentUser = new User(req.body.user);
//   const existingUser = User.findOne({
//     Id: req.body.user.Id,
//   });
//   if (existingUser) {
//     currentUser.save((userLogged, saved) => {
//       if (userLogged) {
//         res.json({ userLogged });
//       }
//       console.log(saved);
//     });
//   }
// }
//
// // export function addUser(req, res) {
// //   if (!req.body.user.Id || !req.body.user.name || !req.body.user.email || !req.body.user.avatar) {
// //     res.status(403).end();
// //   }
// //   const currentUser = new User(req.body.user);
// //   const existingUser = User.findOne({
// //     Id: req.body.user.Id,
// //   });
// //   if (existingUser) {
// //     currentUser.save((userLogged, saved) => {
// //       if (userLogged) {
// //         res.json({ userLogged });
// //       }
// //       console.log(saved);
// //     });
// //   }
// // }
