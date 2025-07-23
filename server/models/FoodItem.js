// server/models/FoodItem.js
const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  }
});

// 👇 Register with name 'FoodItem' (PascalCase, singular)
module.exports = mongoose.model('FoodItem', foodItemSchema);
