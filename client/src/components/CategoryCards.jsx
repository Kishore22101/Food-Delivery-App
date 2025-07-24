import React from 'react';
import './CategoryCards.css';
import pizzaImg from '../assets/pizza.jpg';
import burgerImg from '../assets/burger.jpg';
import rollsImg from '../assets/rolls.jpg';
import icecreamImg from '../assets/icecream.jpg';
import OrderNowButton from './OrderNowButton';

const categories = [
  { name: 'Pizza', image: pizzaImg },
  { name: 'Burger', image: burgerImg },
  { name: 'Rolls', image: rollsImg },
  { name: 'Ice Cream', image: icecreamImg },
];

function CategoryCards() {
  return (
    <section className="category-section">
      <h2 className="category-heading">Explore Top Categories</h2>
      <div className="category-grid">
        {categories.map((item, index) => (
          <div className="category-card" key={index}>
            <img src={item.image} alt={item.name} className="category-img" />
            <div className="category-info">
              <h3>{item.name}</h3>
              <OrderNowButton label="Order Now" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategoryCards;
