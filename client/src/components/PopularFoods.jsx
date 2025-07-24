import React from "react";
import "../components/PopularFoods";

function PopularFoods({ items }) {
  const popularItems = items.slice(0, 4); // Top 4 items (you can change this)

  return (
    <div className="popular-section">
      <h2>🔥 Popular Foods</h2>
      <div className="popular-list">
        {popularItems.map((food, index) => (
          <div key={index} className="popular-card">
            <img src={food.image} alt={food.name} />
            <h3>{food.name}</h3>
            <p>₹{food.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularFoods;
