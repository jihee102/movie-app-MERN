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

module.exports = router;
