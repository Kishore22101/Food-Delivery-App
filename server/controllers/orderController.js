import Order from '../models/orderModel.js';

export const placeOrder = async (req, res) => {
  const { items, totalAmount } = req.body;
  const userId = req.userId;

  try {
    const newOrder = new Order({ user: userId, items, totalAmount });
    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (err) {
    res.status(500).json({ message: 'Failed to place order', error: err.message });
  }
};

export const getMyOrders = async (req, res) => {
  const userId = req.userId;

  try {
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get orders', error: err.message });
  }
};

export const deleteOrder = async (req, res) => {
  const userId = req.userId;
  const orderId = req.params.id;

  try {
    const order = await Order.findOneAndDelete({ _id: orderId, user: userId });
    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete order', error: err.message });
  }
};
