const express = require('express');
const router = express.Router();
const FoodItem = require('../models/FoodItem');

// GET Route to fetch food items
router.get('/', async (req, res) => {
  try {
    const foodItems = await FoodItem.find();
    res.json(foodItems);
  } catch (err) {
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

// DELETE Route to delete a food item by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await FoodItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Food item not found' });
    }
    res.status(200).json({ message: 'Food item deleted successfully' });
  } catch (err) {
    console.log('Error:', err);
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
