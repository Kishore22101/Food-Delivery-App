const express = require('express');
const router = express.Router();
const FoodItem = require('../models/FoodItem');

router.get('/', async (req, res) => {
  try {
    const foodItems = await FoodItem.find();
    res.json(foodItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;