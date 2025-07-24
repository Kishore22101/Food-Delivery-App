import React from "react";
import "../styles/TodayOffers.css";

function TodayOffers() {
  return (
    <section className="today-offers">
      <h2 className="offers-heading">🔥 Today’s Hot Offers</h2>
      <div className="offer-list">
        <div className="offer-card pulse">
          <h3>Flat 50% OFF</h3>
          <p>Use code <strong>FEAST50</strong> on orders above ₹499</p>
        </div>
        <div className="offer-card pulse">
          <h3>Buy 1 Get 1 Free</h3>
          <p>Applicable on selected restaurants</p>
        </div>
        <div className="offer-card pulse">
          <h3>Free Delivery</h3>
          <p>On your first 3 orders</p>
        </div>
      </div>
    </section>
  );
}

export default TodayOffers;
