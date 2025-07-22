const Order = require('../models/Order');

// Place a New Order
const placeOrder = async (req, res, next) => {
  try {
    const { items, totalAmount } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Order must have at least one item' });
    }
    const newOrder = new Order({
      userId: req.user.id,
      items,
      totalAmount
    });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    next(err);
  }
};

// Get All Orders
const getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate('items.foodId');
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

// Delete Order
const deleteOrder = async (req, res, next) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) return res.status(404).json({ message: 'Order not found' });
    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = { placeOrder, getUserOrders, deleteOrder };
