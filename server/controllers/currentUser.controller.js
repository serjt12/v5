// Find my user
// eslint-disable-next-line
export function checkCurrentUser(req, res) {
// console.log('===== user!!======');
// console.log(req.user);
  const userInfo = req.user;
  if (userInfo) {
    return res.send({ userInfo });
  } if (!userInfo) {
    return res.json({ userInfo: null });
  }
}
