import { Router } from 'express';
import * as TravelController from '../controllers/travel.controller';
const router = new Router();
const requireLogin = require('../middlewares/requireLogin');

// Get all travels
router.route('/travels', requireLogin).get(TravelController.getTravels);

// Get all travels by user
router.route('/travels/:user', requireLogin).get(TravelController.getMyTravels);

// Get one travel by cuid
router.route('/travels/:cuid', requireLogin).get(TravelController.getTravel);

// Add a new travel
router.route('/travels').post(TravelController.addTravel);

// Delete a travel by cuid
router.route('/travels/:cuid').delete(TravelController.deleteTravel);

export default router;
