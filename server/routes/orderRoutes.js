const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const verifyToken = require('../middleware/authMiddleware');

// Place a New Order — Protected Route
router.post('/', verifyToken, async (req, res) => {
  try {
    const { items, totalAmount } = req.body;
    const newOrder = new Order({
      userId: req.user.id,  // From JWT
      items,
      totalAmount
    });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get All Orders — Protected Route
router.get('/', verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate('items.foodId');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;