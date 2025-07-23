import mongoose from 'mongoose';
import FoodItem from './models/FoodItem.js';

const MONGO_URL = 'mongodb+srv://admin:admin123@eatzupcluster.6vuqt0s.mongodb.net/food-app?retryWrites=true&w=majority&appName=EatzUpCluster';

const imageLinks = {
  'Chole Bhature': 'https://i.ibb.co/JwB9vbQ/Chole-Bhature.jpg',
  'Chole Bhature spl': 'https://i.ibb.co/JR9S0Nd/Chole-Bhature1.jpg',
  'Burger': 'https://i.ibb.co/0VMsBXB/Burger.jpg',
  'Chicken Wings': 'https://i.ibb.co/C5zVTYw/Chicken-Wings.jpg',
  'Dosa': 'https://i.ibb.co/gb7z0DW/Dosa.jpg',
  'French Fries': 'https://i.ibb.co/4nzL7by/French-Fries.jpg',
  'Fried Rice': 'https://i.ibb.co/jvyy3c1/Fried-Rice.jpg',
  'Grilled Sandwich': 'https://i.ibb.co/whND0my/Grilled-Sandwich.jpg',
  'Momo': 'https://i.ibb.co/nNdPCHK/Momo.jpg',
  'Pizza': 'https://i.ibb.co/5XXkLhM/Pizza.jpg',
  'Pav Bhaji': 'https://i.ibb.co/1fd460N/Pav-Bhaji.jpg',
};

const updateImages = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('MongoDB connected...');

    for (const name in imageLinks) {
      const result = await FoodItem.findOneAndUpdate(
        { name },
        { image: imageLinks[name] },
        { new: true }
      );

      if (result) {
        console.log(`✅ Updated image for: ${name}`);
      } else {
        console.log(`❌ Not found in DB: ${name}`);
      }
    }

    console.log('✅ All done!');
    mongoose.disconnect();
  } catch (err) {
    console.error('❌ Error updating images:', err);
    mongoose.disconnect();
  }
};

updateImages();
