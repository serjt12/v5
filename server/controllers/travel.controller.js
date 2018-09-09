import Travel from '../models/travel';
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
  .populate('author')
  .populate('passenger')
  .sort('-dateAdded')
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
  newTravel.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
      console.log(err);
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
  Travel.findOne({ cuid: req.params.cuid })
  .populate('author')
  .populate('passenger')
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
    { $push: { passenger: userid } },
    { new: true },
  )
  .populate('passengers')
  .exec(function (err, user) {
    if (err) {
      res.json({ err });
    }
    console.log(user)
    return res.json({
      success: 'Viaje Aceptado con exito'
    })
  })
}
