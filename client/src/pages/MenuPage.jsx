import React from 'react';
import FoodCard from '../components/FoodCard';
import './MenuPage.css';

const sampleFoods = [
  {
    id: 1,
    name: 'Chole Bhature',
    price: 120,
    image: '/images/chole-bhature.jpg',
  },
  {
    id: 2,
    name: 'Paneer Tikka',
    price: 150,
    image: '/images/paneer-tikka.jpg',
  },
  {
    id: 3,
    name: 'Veg Biryani',
    price: 130,
    image: '/images/veg-biryani.jpg',
  },
  {
    id: 4,
    name: 'Pizza Margherita',
    price: 200,
    image: '/images/pizza.jpg',
  },
];

function MenuPage() {
  return (
    <div className="menu-container">
      <h2 className="menu-title">Explore Our Menu</h2>
      <div className="food-grid">
        {sampleFoods.map(food => (
          <FoodCard key={food.id} food={food} />
        ))}
      </div>
    </div>
  );
}

export default MenuPage;
