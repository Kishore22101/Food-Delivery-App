import React from 'react';
import './Account.css';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaSignOutAlt,
  FaEdit,
  FaClipboardList,
  FaMapMarkerAlt,
} from 'react-icons/fa';

function Account() {
  // Dummy user data — replace with real API/context data later
  const user = {
    name: 'EatzUp',
    email: 'eatzup@example.com',
    mobile: '+91 98765 43210',
    address: '123, Food Street, Chennai, India',
    joined: 'July 2023',
  };

  return (
    <div className="account-page">
      <h2 className="account-title">👤 Your Profile</h2>

      <div className="profile-card glass">
        <FaUser className="profile-icon" />
        <h3>{user.name}</h3>
        <p><FaEnvelope className="icon" /> {user.email}</p>
        <p><FaPhone className="icon" /> {user.mobile}</p>
        <p><FaMapMarkerAlt className="icon" /> {user.address}</p>
        <p><FaCalendarAlt className="icon" /> Joined: {user.joined}</p>

        <div className="account-actions">
          <button className="account-btn"><FaEdit /> Edit Profile</button>
          <button className="account-btn"><FaClipboardList /> My Orders</button>
          <button className="account-btn logout"><FaSignOutAlt /> Logout</button>
        </div>
      </div>
    </div>
  );
}

export default Account;
