const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const { Favorite } = require('../models/Favorite');

const { auth } = require('../middleware/auth');

router.post('/favorite-number', (req, res) => {
  const movieId = req.body.movieId;

  Favorite.find({ movieId: movieId }).exec((err, data) => {
    if (err) return res.status(400).send(err);

    res.status(200).json({ success: true, favoriteNumber: data.length });
  });
});

router.post('/favorited', (req, res) => {
  const movieId = req.body.movieId;

  Favorite.find({ movieId: movieId, user: req.body.user }).exec((err, data) => {
    if (err) return res.status(400).send(err);

    let result = false;
    if (data.length !== 0) {
      result = true;
    }
    res.status(200).json({ success: true, Favorited: result });
  });
});

router.post('/addFavorite', (req, res) => {
  const favorite = new Favorite(req.body);
  favorite.save((err, data) => {
    if (err) return res.status(400).send(err);
    return res.status(200).send({ success: true });
  });
});

router.post('/removeFavorite', (req, res) => {
  Favorite.findOneAndDelete({
    movieId: req.body.movieId,
    user: req.body.user,
  }).exec((err, data) => {
    if (err) return res.status(400).send(err);
    return res.status(200).send({ success: true, data });
  });
});

router.post('/getFavoritedMovie', (req, res) => {
  Favorite.find({ user: req.body.user }).exec((err, data) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, data });
  });
});
module.exports = router;
