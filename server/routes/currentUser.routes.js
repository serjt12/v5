import { Router } from 'express';
// import * as UserController from '../controllers/user.controller';

const router = new Router();

// Get current user
router.get('/current_user', (req, res) => {
  // console.log('===== user!!======');
  console.log(req.user);
  const userInfo = req.user
  // console.log(userInfo);
  if (userInfo) {
    return res.send({ userInfo });
  } if (!userInfo) {
    return res.json({ user: null });
  }
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});
export default router;
