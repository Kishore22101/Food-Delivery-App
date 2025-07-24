// src/components/NearbyRestaurants.jsx
import React from 'react';
import '../styles/NearbyRestaurants.css';

// Dummy Data
const restaurants = [
  {
    name: 'Spice Junction',
    image: '/src/assets/rest1.jpg',
    cuisine: 'Indian, Biryani',
    location: 'Chennai, TN'
  },
  {
    name: 'Taste of China',
    image: '/src/assets/rest2.jpg',
    cuisine: 'Chinese, Asian',
    location: 'Coimbatore, TN'
  },
  {
    name: 'Pasta House',
    image: '/src/assets/rest3.jpg',
    cuisine: 'Italian, Pasta',
    location: 'Bangalore, KA'
  },
  {
    name: 'Burger Point',
    image: '/src/assets/rest4.jpg',
    cuisine: 'Burgers, Fast Food',
    location: 'Hyderabad, TS'
  },
  {
    name: 'Sushi World',
    image: '/src/assets/rest5.jpg',
    cuisine: 'Japanese, Sushi',
    location: 'Mumbai, MH'
  }
];

function NearbyRestaurants() {
  return (
    <section className="nearby-carousel">
      <h2>🍽️ Nearby Popular Restaurants</h2>

      <div className="carousel-track">
        {restaurants.map((res, index) => (
          <div className="restaurant-card" key={index}>
            <img src={res.image} alt={res.name} />
            <div className="card-info">
              <h3>{res.name}</h3>
              <p>{res.cuisine}</p>
              <span>{res.location}</span>
            </div>
          </div>
        ))}

        {/* 🔁 Duplicate cards for infinite loop illusion */}
        {restaurants.map((res, index) => (
          <div className="restaurant-card" key={`repeat-${index}`}>
            <img src={res.image} alt={res.name} />
            <div className="card-info">
              <h3>{res.name}</h3>
              <p>{res.cuisine}</p>
              <span>{res.location}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default NearbyRestaurants;
