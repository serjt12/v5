import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
const router = new Router();

// add a new user
router.route('/signup').post(UserController.addUser);
// Update a user by cuid
router.route('/update_user/:userID').put(UserController.updateUser);
// Rate a user
router.route('/rate_user/:userID').put(UserController.rateUser);
// Confirm an email
router.route('/verify_email').get(UserController.verifyEmail);


export default router;
