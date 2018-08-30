import { Router } from 'express';
import * as TravelController from '../controllers/travel.controller';
const router = new Router();
const requireLogin = require('../middlewares/requireLogin');

// Get all Posts
router.route('/travels', requireLogin).get(TravelController.getTravels);

// Get one post by cuid
router.route('/travels/:cuid', requireLogin).get(TravelController.getTravel);

// Add a new Post
router.route('/travels').post(TravelController.addTravel);

// Delete a post by cuid
router.route('/travels/:cuid').delete(TravelController.deleteTravel);

export default router;
