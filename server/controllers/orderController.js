import Order from '../models/orderModel.js';

export const placeOrder = async (req, res) => {
  const { items, totalAmount } = req.body;
  const userId = req.userId;

  try {
    const newOrder = new Order({ userId, items, totalAmount });
    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Order failed' });
  }
};

export const getMyOrders = async (req, res) => {
  const userId = req.userId;
  try {
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Fetching orders failed' });
  }
};
