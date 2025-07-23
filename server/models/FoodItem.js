import mongoose from 'mongoose';

const foodItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: String
}, { timestamps: true });

const FoodItem = mongoose.model('FoodItem', foodItemSchema);

export default FoodItem;
