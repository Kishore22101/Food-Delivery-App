const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [
    {
      foodId: { type: mongoose.Schema.Types.ObjectId, ref: 'FoodItem' },
      quantity: Number
    }
  ],
  totalAmount: Number,
  status: { type: String, default: 'Pending' },
  orderedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);