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

module.exports = router;
