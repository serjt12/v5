import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
const router = new Router();


// Update a user by cuid
router.route('/update_user/:userID').put(UserController.updateUser);
// Rate a user
router.route('/rate_user').post(UserController.rateUser);
// Confirm an email
router.route('/verify_email').get(UserController.verifyEmail);


export default router;
