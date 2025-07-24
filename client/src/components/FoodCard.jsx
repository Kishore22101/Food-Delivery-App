import React from 'react';
import './FoodCard.css';

function FoodCard({ food }) {
  return (
    <div className="food-card">
      <img src={food.image} alt={food.name} className="food-img" />
      <h3>{food.name}</h3>
      <p>₹{food.price}</p>
      <button className="add-btn">Add to Cart</button>
    </div>
  );
}

export default FoodCard;
