// Find my travels
export function checkCurrentUser(req, res) {
// console.log('===== user!!======');
// console.log(req.user);
  const userInfo = req.user;
// console.log(userInfo);
  if (userInfo) {
    return res.send({ userInfo });
  } if (!userInfo) {
    return res.json({ user: null });
  }
}
