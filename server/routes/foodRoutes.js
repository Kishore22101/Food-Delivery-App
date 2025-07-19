const express = require('express');
const router = express.Router();
const FoodItem = require('../models/FoodItem');

router.get('/', async (req, res) => {
  try {
    const foodItems = await FoodItem.find();
    console.log('Fetched Data:', foodItems);  // ✅ Debugging Line
    res.json(foodItems);
  } catch (err) {
    console.log('Error:', err);
    res.status(500).json({ message: err.message });
  }
});

// POST Route to add new food item
router.post('/', async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const newFoodItem = new FoodItem({
      name,
      description,
      price,
      category
    });
    await newFoodItem.save();
    res.status(201).json(newFoodItem);
  } catch (err) {
    console.log('Error:', err);
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
