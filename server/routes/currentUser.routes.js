import { Router } from 'express';
const passport = require('passport');
// import * as UserController from '../controllers/user.controller';
import User from '../models/user';
// const requireLogin = require('../middlewares/requireLogin');

const router = new Router();

// Get current user
router.get('/current_user',
  (req, res) => {
  // console.log('===== user!!======');
  // console.log(req.user);
    const userInfo = req.user;
  // console.log(userInfo);
    if (userInfo) {
      return res.send({ userInfo });
    } if (!userInfo) {
      return res.json({ user: null });
    }
  });

router.post('/signup', (req, res) => {
  const { cellphone, password } = req.body.user;
  User.findOne({ 'local.cellphone': cellphone }, (err, userMatch) => {
    if (userMatch) {
      return res.json({
        error: `Lo sentimos pero el numero ${cellphone} ya esta registrado`,
      });
    }
    const newUser = new User({
      'local.cellphone': cellphone,
      'local.password': password,
    });
    newUser.save((err1, userInfo) => {
      if (err1) return res.json(err1);
      return res.json(userInfo);
    });
  });
});

router.post('/login', passport.authenticate('local'),
	(req, res) => {
		console.log('POST to /login')
		const user = JSON.parse(JSON.stringify(req.user)) // hack
		const cleanUser = Object.assign({}, user)
		if (cleanUser.local) {
			console.log(`Deleting ${cleanUser.local.password}`)
			delete cleanUser.local.password
		}
		res.json({ user: cleanUser })
	})


router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});
export default router;
