import Travel from '../models/travel';
import User from '../models/user';
import Like from '../models/likes';
import cuid from 'cuid';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all travels
 * @param req
 * @param res
 * @returns void
 */
export function getTravels(req, res) {
  console.log('GET TRAVELS')
  Travel.find().sort('-dateAdded').exec((err, travels) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ travels });
  });
}

// Find my travels
export function getMyTravels(req, res) {
  console.log('USER ID', req.params.user)
  Travel.find({ author: req.params.user }).populate('user').exec((err, mytravels) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ mytravels });
  });
}

/**
 * Save a travel
 * @param req
 * @param res
 * @returns void
 */
export function addTravel(req, res) {
  const newTravel = new Travel(req.body.travel);
  const user = new User();
  const like = new Like();

  // Let's sanitize inputs
  newTravel.from = sanitizeHtml(newTravel.from);
  newTravel.to = sanitizeHtml(newTravel.to);
  newTravel.date = sanitizeHtml(newTravel.date);
  newTravel.plate = sanitizeHtml(newTravel.plate);
  newTravel.price = sanitizeHtml(newTravel.price);
  newTravel.model = sanitizeHtml(newTravel.model);
  newTravel.content = sanitizeHtml(newTravel.content);
  newTravel.author = user._id;
  newTravel.likes = like._id;
  newTravel.cuid = cuid();
  console.log('NEW TRAVEL', newTravel);
  console.log('User', user);
  console.log('Likes', like);
  newTravel.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
      console.log(err)
    }
    res.json({ travel: saved });
  });
}

/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
export function getTravel(req, res) {
  Travel.findOne({ cuid: req.params.cuid }).exec((err, travel) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ travel });
  });
}

/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
export function deleteTravel(req, res) {
  Travel.findOne({ cuid: req.params.cuid }).exec((err, travel) => {
    if (err) {
      res.status(500).send(err);
    }

    travel.remove(() => {
      res.status(200).end();
    });
  });
}
