import { Router } from 'express';
const passport = require('passport');
const router = new Router();

// auth the user
router.get(
  '/google',
  passport.authenticate('google',
  { scope: ['profile', 'email'] }));

router.get(
	'/google/callback',
	passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/travel',
	})
);
router.get(
  '/facebook',
  passport.authenticate('facebook')
);

router.get(
	'/facebook/callback',
	passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/travel',
	})
);

router.post(
  '/login',
  (req, res, next) => {
    console.log(req.body);
    console.log('================');
    next();
  },
  passport.authenticate('local'),
    (req, res) => {
      console.log('POST to /login');
      const user = JSON.parse(JSON.stringify(req.user)); // hack
      const cleanUser = Object.assign({}, user);
      if (cleanUser.local) {
        console.log(`Deleting ${cleanUser.local.password}`);
        delete cleanUser.local.password;
      }
      res.json({ user: cleanUser });
    }
);


export default router;
