import Travel from '../models/travel';
import User from '../models/user';
import cuid from 'cuid';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all travels
 * @param req
 * @param res
 * @returns void
 */
export function getTravels(req, res) {
  Travel.find()
  .sort('-dateAdded')
  .populate('passenger author')
  .exec((err, travels) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ travels });
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

  // Let's sanitize inputs
  newTravel.from = sanitizeHtml(newTravel.from);
  newTravel.to = sanitizeHtml(newTravel.to);
  newTravel.date = sanitizeHtml(newTravel.date);
  newTravel.plate = sanitizeHtml(newTravel.plate);
  newTravel.price = sanitizeHtml(newTravel.price);
  newTravel.model = sanitizeHtml(newTravel.model);
  newTravel.content = sanitizeHtml(newTravel.content);
  newTravel.sits = sanitizeHtml(newTravel.sits);
  newTravel.author = req.user._id;
  newTravel.cuid = cuid();
  User.findById(
    req.user._id,
  )
  .exec(function (err, user) {
    if (err) {
      res.json({ err });
    }
    if (!user.confirmed) {
      res.json({ msg: 'Aun no has confirmado tu mail' });
    }
    if (user.confirmed) {
      newTravel.save((err1, saved) => {
        if (err1) {
          res.status(500).send(err1);
        }
        res.json({ travel: saved });
      });
    }
  });
}

/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
export function getTravel(req, res) {
  Travel.findOne({ cuid: req.params.cuid })
  .populate('passenger author')
  .exec((err, travel) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ travel });
  });
}

/**
 * Delete a trvel
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

export function addUserTravel(req, res) {
  const data = req.body.data
  const { travelid, userid } = data
  Travel.findByIdAndUpdate(
    travelid,
    {
      $push: { passenger: userid },
      $inc: { sits: -1 },
    },
    { new: true },
  )
  .populate('passenger author')
  .exec(function (err, user) {
    if (err) {
      res.json({ err });
    }
    if (!user.confirmed) {
      return res.json({
        fail: 'Aun no has confirmado tu mail',
      });
    }
    if (user.confirmed) {
      return res.json({
        success: 'Viaje Aceptado con exito',
      });
    }
  });
}
