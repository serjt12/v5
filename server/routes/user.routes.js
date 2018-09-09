import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
const router = new Router();

// add a new user
router.route('/signup').post(UserController.addUser);
// Update a user by cuid
router.route('/update_user/:userID').put(UserController.updateUser);

export default router;
