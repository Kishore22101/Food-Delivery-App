// server/routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const FoodItem = require('../models/FoodItem'); // ✅ Model imported
const verifyToken = require('../middleware/authMiddleware');

// ✅ Place New Order — Protected
router.post('/', verifyToken, async (req, res) => {
  try {
    const { items, totalAmount } = req.body;

    if (!items || items.length === 0) {
      console.log(`❌ Order Failed: Empty items array`);
      return res.status(400).json({ message: 'Order must have at least one item' });
    }

    // ✅ Validate if each foodId exists
    for (const item of items) {
      const exists = await FoodItem.findById(item.foodId);
      if (!exists) {
        console.log(`❌ Invalid Food ID: ${item.foodId}`);
        return res.status(404).json({ message: `Food item not found: ${item.foodId}` });
      }
    }

    const newOrder = new Order({
      userId: req.user.id,
      items,
      totalAmount
    });

    await newOrder.save();

    console.log(`✅ Order Placed for User ID: ${req.user.id}`);
    res.status(201).json(newOrder);
  } catch (err) {
    console.log(`❌ Order Error: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get User Orders — Protected
router.get('/', verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate('items.foodId');
    console.log(`✅ Orders Fetched for User ID: ${req.user.id}`);
    res.json(orders);
  } catch (err) {
    console.log(`❌ Fetch Order Error: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
});

// ✅ Delete Order — Protected
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      console.log(`❌ Delete Failed: Order not found ID ${req.params.id}`);
      return res.status(404).json({ message: 'Order not found' });
    }

    console.log(`✅ Order Deleted: ${req.params.id}`);
    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    console.log(`❌ Delete Error: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
