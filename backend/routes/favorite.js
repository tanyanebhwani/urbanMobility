const express = require('express');
const router = express.Router();
const Favorite = require('../models/Favorite');
const authenticateToken = require('../middleware/authenticate');

// Add a favorite route
router.post('/add', authenticateToken, async (req, res) => {
  try {
    const { startLocation, endLocation,startCoordinates,endCoordinates, routeInfo } = req.body;
    const favorite = new Favorite({
      userId: req.user.id,
      startLocation,
      endLocation,
      startCoordinates,
      endCoordinates,
      routeInfo
    });

    await favorite.save();

    res.status(201).json(favorite);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get all favorite routes for the authenticated user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.user.id });
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Delete a favorite route by ID
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const favoriteId = req.params.id;
    const favorite = await Favorite.findOneAndDelete({ _id: favoriteId, userId: req.user.id });

    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }

    res.status(200).json({ message: 'Favorite deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});
router.get('/fetchOne/:id', authenticateToken, async (req, res) => {
  try {
    const favorites = await Favorite.findOne({ userId: req.user.id, _id: req.params.id });
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});
module.exports = router;

//"bcrypt": "^5.1.1",