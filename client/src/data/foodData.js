// src/data/foodData.js
// Images are mapped to available assets in /src/assets/
// Categories: North Indian, South Indian, Italian

import pizza from '../assets/pizza.jpg';
import burger from '../assets/Burger.jpg';
import rolls from '../assets/rolls.jpg';
import cheeseburst from '../assets/cheeseburst.jpg';
import icecream from '../assets/icecream.jpg';
import rest1Img from '../assets/rest1.jpg';
import rest2Img from '../assets/rest2.jpg';
import rest3Img from '../assets/rest3.jpg';
import rest4Img from '../assets/rest4.jpg';
import rest5Img from '../assets/rest5.jpg';

// Eagerly load all menu images from src/Image
const images = import.meta.glob('../Image/*', { eager: true });

const getFoodImage = (name) => {
  const key = Object.keys(images).find(k => {
    const filename = k.split('/').pop();
    const nameWithoutExt = filename.substring(0, filename.lastIndexOf('.'));
    return nameWithoutExt.toLowerCase() === name.toLowerCase();
  });
  return key ? images[key].default : null;
};

// Rotating available images across food items (fallbacks)
const imgs = [pizza, burger, rolls, cheeseburst, icecream, rest1Img, rest2Img, rest3Img, rest4Img, rest5Img];
const img = (i) => imgs[i % imgs.length];

const rawFoodData = [
  // ---------- NORTH INDIAN ----------
  { name: 'Chole Bhature',         price: 120, category: 'North Indian', image: img(0),  description: 'Spicy chickpeas served with deep-fried bread.' },
  { name: 'Butter Chicken',        price: 200, category: 'North Indian', image: img(1),  description: 'Creamy tomato-based chicken curry.' },
  { name: 'Paneer Tikka',          price: 160, category: 'North Indian', image: img(2),  description: 'Grilled marinated paneer cubes.' },
  { name: 'Dal Makhani',           price: 130, category: 'North Indian', image: img(3),  description: 'Slow-cooked black lentils in creamy gravy.' },
  { name: 'Rajma Chawal',          price: 100, category: 'North Indian', image: img(4),  description: 'Red kidney beans curry with rice.' },
  { name: 'Tandoori Chicken',      price: 190, category: 'North Indian', image: img(5),  description: 'Chicken marinated in yogurt and spices, grilled to perfection.' },
  { name: 'Palak Paneer',          price: 140, category: 'North Indian', image: img(6),  description: 'Spinach curry with cottage cheese cubes.' },
  { name: 'Aloo Paratha',          price: 90,  category: 'North Indian', image: img(7),  description: 'Stuffed flatbread with spiced potatoes.' },
  { name: 'Chicken Korma',         price: 180, category: 'North Indian', image: img(8),  description: 'Rich and creamy chicken curry.' },
  { name: 'Kadai Paneer',          price: 150, category: 'North Indian', image: img(9),  description: 'Paneer cooked with capsicum in a spicy gravy.' },
  { name: 'Bhindi Masala',         price: 110, category: 'North Indian', image: img(0),  description: 'Spicy okra fry.' },
  { name: 'Malai Kofta',           price: 150, category: 'North Indian', image: img(1),  description: 'Soft paneer dumplings in creamy gravy.' },
  { name: 'Baingan Bharta',        price: 120, category: 'North Indian', image: img(2),  description: 'Smoky mashed eggplant curry.' },
  { name: 'Chicken Tikka Masala',  price: 200, category: 'North Indian', image: img(3),  description: 'Spiced grilled chicken in tomato sauce.' },
  { name: 'Jeera Rice',            price: 80,  category: 'North Indian', image: img(4),  description: 'Basmati rice with cumin seeds.' },
  { name: 'Methi Thepla',          price: 100, category: 'North Indian', image: img(5),  description: 'Spiced fenugreek flatbread.' },
  { name: 'Gajar Halwa',           price: 90,  category: 'North Indian', image: img(6),  description: 'Sweet carrot dessert with milk and nuts.' },
  { name: 'Lassi',                 price: 60,  category: 'North Indian', image: img(7),  description: 'Chilled yogurt-based drink.' },
  { name: 'Kachori',               price: 70,  category: 'North Indian', image: img(8),  description: 'Fried pastry filled with spicy lentils.' },
  { name: 'Punjabi Kadhi Pakora',  price: 110, category: 'North Indian', image: img(9),  description: 'Gram flour dumplings in yogurt curry.' },

  // ---------- SOUTH INDIAN ----------
  { name: 'Masala Dosa',          price: 90,  category: 'South Indian', image: img(3),  description: 'Crispy dosa filled with spiced potatoes.' },
  { name: 'Idli Sambar',          price: 60,  category: 'South Indian', image: img(4),  description: 'Steamed rice cakes with spicy lentil soup.' },
  { name: 'Medu Vada',            price: 70,  category: 'South Indian', image: img(5),  description: 'Crispy lentil fritters.' },
  { name: 'Upma',                 price: 65,  category: 'South Indian', image: img(6),  description: 'Semolina breakfast dish with spices.' },
  { name: 'Pongal',               price: 75,  category: 'South Indian', image: img(7),  description: 'Rice-lentil dish seasoned with pepper and ghee.' },
  { name: 'Onion Uttapam',        price: 85,  category: 'South Indian', image: img(8),  description: 'Thick dosa topped with onions.' },
  { name: 'Lemon Rice',           price: 80,  category: 'South Indian', image: img(9),  description: 'Tangy yellow rice with mustard seeds.' },
  { name: 'Chicken Chettinad',    price: 190, category: 'South Indian', image: img(0),  description: 'Spicy Chettinad-style chicken curry.' },
  { name: 'Fish Curry',           price: 200, category: 'South Indian', image: img(1),  description: 'Tangy fish curry with coconut and spices.' },
  { name: 'Curd Rice',            price: 70,  category: 'South Indian', image: img(2),  description: 'Cooling rice mixed with curd and seasoning.' },
  { name: 'Pesarattu',            price: 85,  category: 'South Indian', image: img(3),  description: 'Green gram dosa.' },
  { name: 'Kozhukattai',          price: 65,  category: 'South Indian', image: img(4),  description: 'Steamed rice dumpling, often sweet.' },
  { name: 'Rasam',                price: 60,  category: 'South Indian', image: img(5),  description: 'Spicy and tangy tamarind soup.' },
  { name: 'Sambar Rice',          price: 90,  category: 'South Indian', image: img(6),  description: 'Rice mixed with lentil-vegetable stew.' },
  { name: 'Thayir Vadai',         price: 80,  category: 'South Indian', image: img(7),  description: 'Lentil fritters soaked in curd.' },
  { name: 'Avial',                price: 95,  category: 'South Indian', image: img(8),  description: 'Mixed vegetables cooked in coconut gravy.' },
  { name: 'Tomato Bath',          price: 85,  category: 'South Indian', image: img(9),  description: 'Spiced tomato rice.' },
  { name: 'Kootu',                price: 70,  category: 'South Indian', image: img(0),  description: 'Vegetable stew with lentils.' },
  { name: 'Murukku',              price: 50,  category: 'South Indian', image: img(1),  description: 'Crispy spiral savory snack.' },
  { name: 'Filter Coffee',        price: 40,  category: 'South Indian', image: img(2),  description: 'Strong South Indian-style brewed coffee.' },

  // ---------- ITALIAN ----------
  { name: 'Margherita Pizza',     price: 180, category: 'Italian', image: pizza,       description: 'Classic pizza with tomato, mozzarella, and basil.' },
  { name: 'Pasta Alfredo',        price: 160, category: 'Italian', image: img(7),      description: 'Creamy white sauce pasta.' },
  { name: 'Lasagna',              price: 200, category: 'Italian', image: img(8),      description: 'Layered pasta with cheese, sauce, and meat.' },
  { name: 'Penne Arrabiata',      price: 170, category: 'Italian', image: img(9),      description: 'Penne pasta in spicy tomato sauce.' },
  { name: 'Garlic Bread',         price: 90,  category: 'Italian', image: img(0),      description: 'Toasted bread with garlic and butter.' },
  { name: 'Spaghetti Bolognese',  price: 190, category: 'Italian', image: img(1),      description: 'Spaghetti in meat-based sauce.' },
  { name: 'Fettuccine Alfredo',   price: 180, category: 'Italian', image: img(2),      description: 'Flat pasta in creamy Alfredo sauce.' },
  { name: 'Cheese Ravioli',       price: 170, category: 'Italian', image: img(3),      description: 'Stuffed pasta with cheese filling.' },
  { name: 'Pizza Pepperoni',      price: 200, category: 'Italian', image: cheeseburst, description: 'Pizza topped with spicy pepperoni.' },
  { name: 'Mushroom Risotto',     price: 160, category: 'Italian', image: img(5),      description: 'Creamy rice dish with mushrooms.' },
  { name: 'Tiramisu',             price: 120, category: 'Italian', image: icecream,    description: 'Coffee-flavored Italian dessert.' },
  { name: 'Bruschetta',           price: 100, category: 'Italian', image: img(7),      description: 'Grilled bread topped with tomatoes and basil.' },
  { name: 'Calzone',              price: 180, category: 'Italian', image: img(8),      description: 'Folded pizza stuffed with meats and cheese.' },
  { name: 'Gnocchi',              price: 150, category: 'Italian', image: img(9),      description: 'Soft potato dumplings served with sauce.' },
  { name: 'Caprese Salad',        price: 110, category: 'Italian', image: img(0),      description: 'Fresh tomatoes, mozzarella, and basil.' },
  { name: 'Cannoli',              price: 100, category: 'Italian', image: img(1),      description: 'Tube-shaped pastry with sweet filling.' },
  { name: 'Pizza Bianca',         price: 190, category: 'Italian', image: pizza,       description: 'White pizza without tomato sauce.' },
  { name: 'Tomato Basil Soup',    price: 90,  category: 'Italian', image: img(3),      description: 'Smooth tomato soup with fresh basil.' },
  { name: 'Minestrone Soup',      price: 100, category: 'Italian', image: img(4),      description: 'Vegetable soup with pasta and beans.' },
  { name: 'Espresso',             price: 50,  category: 'Italian', image: img(5),      description: 'Strong and rich Italian coffee shot.' },
];

const foodData = rawFoodData.map(item => ({
  ...item,
  image: getFoodImage(item.name) || item.image
}));

export default foodData;
