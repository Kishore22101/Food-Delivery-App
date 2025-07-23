import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
      image: String
    }
  ],
  totalAmount: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
