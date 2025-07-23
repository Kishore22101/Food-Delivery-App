// insertFood.js
import mongoose from 'mongoose';
import FoodItem from './models/FoodItem.js';

const MONGO_URI = 'mongodb+srv://admin:admin123@eatzupcluster.6vuqt0s.mongodb.net/food-app?retryWrites=true&w=majority&appName=EatzUpCluster';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch((err) => console.error('❌ Connection Error:', err));

// ✅ Replace below with your 11 food items
const foodItems = [
  {
    name: "Chole Bhature",
    price: 120,
    image: "https://example.com/chole-bhature1.jpg",
    description: "Delicious North Indian dish served hot with pickle."
  },
  {
    name: "Chole Bhature (Special)",
    price: 140,
    image: "https://example.com/chole-bhature2.jpg",
    description: "Extra rich version with more chole and paneer toppings."
  },
  {
    name: "Veg Biryani",
    price: 100,
    image: "https://example.com/veg-biryani.jpg",
    description: "Aromatic rice dish with vegetables and spices."
  },
  {
    name: "Chicken Biryani",
    price: 160,
    image: "https://example.com/chicken-biryani.jpg",
    description: "Spicy chicken biryani served with raita."
  },
  {
    name: "Masala Dosa",
    price: 80,
    image: "https://example.com/masala-dosa.jpg",
    description: "Crispy dosa filled with spicy potato masala."
  },
  {
    name: "Idli Sambar",
    price: 50,
    image: "https://example.com/idli.jpg",
    description: "Soft idlis with hot sambar and chutney."
  },
  {
    name: "Paneer Butter Masala",
    price: 130,
    image: "https://example.com/paneer-butter-masala.jpg",
    description: "Paneer cubes cooked in buttery tomato gravy."
  },
  {
    name: "Butter Naan",
    price: 40,
    image: "https://example.com/butter-naan.jpg",
    description: "Soft naan brushed with butter."
  },
  {
    name: "Samosa",
    price: 20,
    image: "https://example.com/samosa.jpg",
    description: "Crispy snack filled with spicy potato."
  },
  {
    name: "Gulab Jamun",
    price: 60,
    image: "https://example.com/gulab-jamun.jpg",
    description: "Sweet dessert soaked in sugar syrup."
  },
  {
    name: "Pav Bhaji",
    price: 90,
    image: "https://example.com/pav-bhaji.jpg",
    description: "Mumbai street food with buttered pav and spicy bhaji."
  }
];

const insertData = async () => {
  try {
    await FoodItem.deleteMany(); // optional: clear old data
    await FoodItem.insertMany(foodItems);
    console.log("✅ Food items inserted successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Insert failed:", error);
  }
};

insertData();
