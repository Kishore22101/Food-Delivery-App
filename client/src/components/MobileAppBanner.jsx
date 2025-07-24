import React from "react";
import "../styles/MobileAppBanner.css";
import appImage from "../assets/app-download.jpg"; // ✅ Best way: import image directly

function MobileAppBanner() {
  return (
    <section className="mobile-app-banner">
      <div className="app-content">
        {/* Left Side - Text */}
        <div className="app-text">
          <h2>📲 Download EatzUp App</h2>
          <p>
            Get exclusive deals, lightning-fast delivery, and personalized food recommendations — all in one app.
          </p>
          <div className="download-buttons">
            <button className="download-btn">📥 Download Now</button>
            <span className="available-text">Available on Android & iOS</span>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="app-image">
          <img src={appImage} alt="EatzUp App Preview" />
        </div>
      </div>
    </section>
  );
}

export default MobileAppBanner;
