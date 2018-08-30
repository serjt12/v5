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
  successRedirect: '/profile',
  failureRedirect: '/',
	})
);
router.get(
  '/facebook',
  passport.authenticate('facebook')
);

router.get(
	'/facebook/callback',
	passport.authenticate('facebook', {
  successRedirect: '/profile',
  failureRedirect: '/',
	})
);

export default router;
