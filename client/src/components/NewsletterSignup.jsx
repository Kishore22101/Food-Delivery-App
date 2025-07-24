import React from "react";
import "../styles/NewsletterSignup.css";

function NewsletterSignup() {
  return (
    <section className="newsletter-section">
      <h2>📬 Stay Updated with Offers</h2>
      <p>Subscribe to our newsletter and never miss out on tasty deals!</p>

      <div className="newsletter-form">
        <input type="email" placeholder="Enter your email address" />
        <button type="submit">Subscribe</button>
      </div>
    </section>
  );
}

export default NewsletterSignup;
