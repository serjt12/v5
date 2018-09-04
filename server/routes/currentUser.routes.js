import { Router } from 'express';
const passport = require('passport');
import * as CurrentUserController from '../controllers/currentUser.controller';
import User from '../models/user';
// const requireLogin = require('../middlewares/requireLogin');

const router = new Router();

// Get current user
router.route('/current_user').get(CurrentUserController.checkCurrentUser);

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
