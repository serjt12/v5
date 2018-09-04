import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
const router = new Router();
const passport = require('passport');

// add a user to a travel
router.route('/user_to_travel').post(UserController.addUserTravel);
// add a new user
router.route('/signup').post(UserController.addUser);
// //
// //
export default router;

router.post('/login',
  passport.authenticate('local'),
	(req, res) => {
  console.log('POST to /login');
  const user = JSON.parse(JSON.stringify(req.user)); // hack
  const cleanUser = Object.assign({}, user);
  if (cleanUser.local) {
    console.log(`Deleting ${cleanUser.local.password}`);
    delete cleanUser.local.password;
  }
  res.json({ user: cleanUser })
	})
