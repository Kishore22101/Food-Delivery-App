// src/pages/BookTable.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookTable.css';
import { dummyRestaurants } from './Restaurants';

/* ─── SVG Icons ─── */
const IconStar = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ width: '16px', height: '16px' }}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);
const IconMapPin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: '16px', height: '16px' }}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
const IconCalendar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: '18px', height: '18px' }}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const IconUsers = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: '18px', height: '18px' }}>
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
  </svg>
);
const IconClock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: '18px', height: '18px' }}>
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);
const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: '24px', height: '24px' }}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const TIME_SLOTS = [
  { label: '12:00 PM', period: 'Lunch' },
  { label: '1:00 PM',  period: 'Lunch' },
  { label: '2:00 PM',  period: 'Lunch' },
  { label: '7:00 PM',  period: 'Dinner' },
  { label: '8:00 PM',  period: 'Dinner' },
  { label: '9:00 PM',  period: 'Dinner' },
];

const GUEST_OPTIONS = ['1 Guest', '2 Guests', '3 Guests', '4 Guests', '5 Guests', '6+ Guests'];

// Generate dummy tables for the visual seat map
const SEAT_MAP_TABLES = [
  { id: 'T1', type: 'small', seats: 2, x: 20, y: 30, reserved: false },
  { id: 'T2', type: 'small', seats: 2, x: 50, y: 30, reserved: true },
  { id: 'T3', type: 'medium', seats: 4, x: 80, y: 30, reserved: false },
  { id: 'T4', type: 'medium', seats: 4, x: 20, y: 70, reserved: false },
  { id: 'T5', type: 'large', seats: 6, x: 50, y: 70, reserved: false },
  { id: 'T6', type: 'medium', seats: 4, x: 80, y: 70, reserved: true },
];

function BookTable() {
  const navigate = useNavigate();

  // State
  const [selectedRest, setSelectedRest]   = useState(dummyRestaurants[0]);
  const [bookingDate, setBookingDate]       = useState('');
  const [guestCount, setGuestCount]         = useState('2 Guests');
  const [selectedTime, setSelectedTime]     = useState('7:00 PM');
  const [selectedTable, setSelectedTable]   = useState(null);
  
  // User/Contact Info
  const [name, setName]                     = useState('');
  const [email, setEmail]                   = useState('');
  const [mobile, setMobile]                 = useState('');
  const [pincode, setPincode]               = useState('');
  const [notes, setNotes]                   = useState('');
  
  // Status
  const [isBooked, setIsBooked]             = useState(false);
  const [bookingRef]                        = useState(() => Math.floor(100000 + Math.random() * 900000));

  useEffect(() => {
    // Pre-fill user data if logged in
    const cached = localStorage.getItem('eatzup_user');
    if (cached) {
      const u = JSON.parse(cached);
      setName(u.name || '');
      setEmail(u.email || '');
      setMobile(u.mobile || '');
      setPincode(u.pincode || '');
    }
    // Set default date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setBookingDate(tomorrow.toISOString().split('T')[0]);
  }, []);

  const handleTableClick = (table) => {
    if (table.reserved) return;
    setSelectedTable(table.id === selectedTable ? null : table.id);
  };

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    if (!selectedTable) {
      alert('Please select a table from the visual seat map first.');
      return;
    }
    setIsBooked(true);
  };

  if (isBooked) {
    return (
      <div className="booking-success-container reveal animate-fade-up">
        <div className="booking-ticket">
          <div className="ticket-header">
            <div className="ticket-circle"><IconCheck /></div>
            <h2>Reservation Confirmed</h2>
            <p className="ticket-ref">Booking Ref: #{bookingRef}</p>
          </div>
          
          <div className="ticket-body">
            <div className="ticket-row">
              <div className="ticket-col">
                <span className="ticket-label">Restaurant</span>
                <span className="ticket-value">{selectedRest.name}</span>
              </div>
              <div className="ticket-col">
                <span className="ticket-label">Location</span>
                <span className="ticket-value">{selectedRest.location}</span>
              </div>
            </div>

            <div className="ticket-row">
              <div className="ticket-col">
                <span className="ticket-label">Date</span>
                <span className="ticket-value">{bookingDate.split('-').reverse().join('/')}</span>
              </div>
              <div className="ticket-col">
                <span className="ticket-label">Time Slot</span>
                <span className="ticket-value">{selectedTime}</span>
              </div>
            </div>

            <div className="ticket-row">
              <div className="ticket-col">
                <span className="ticket-label">Table Selected</span>
                <span className="ticket-value">Table {selectedTable}</span>
              </div>
              <div className="ticket-col">
                <span className="ticket-label">Guests Count</span>
                <span className="ticket-value">{guestCount}</span>
              </div>
            </div>

            <div className="ticket-row">
              <div className="ticket-col">
                <span className="ticket-label">Guest Name</span>
                <span className="ticket-value">{name}</span>
              </div>
              <div className="ticket-col">
                <span className="ticket-label">Contact Details</span>
                <span className="ticket-value">{mobile}</span>
              </div>
            </div>
          </div>

          <div className="ticket-footer">
            <div className="barcode" aria-hidden="true">
              <div className="barcode-line" style={{width:'4px'}} />
              <div className="barcode-line" style={{width:'2px'}} />
              <div className="barcode-line" style={{width:'6px'}} />
              <div className="barcode-line" style={{width:'3px'}} />
              <div className="barcode-line" style={{width:'1px'}} />
              <div className="barcode-line" style={{width:'5px'}} />
              <div className="barcode-line" style={{width:'2px'}} />
              <div className="barcode-line" style={{width:'4px'}} />
              <div className="barcode-line" style={{width:'7px'}} />
              <div className="barcode-line" style={{width:'2px'}} />
            </div>
            <p className="ticket-note">Show this pass at the reception counter.</p>
          </div>
        </div>

        <div className="booking-success-actions">
          <button className="booking-btn-primary" onClick={() => navigate('/')}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-page page-wrap reveal animate-fade-up">
      <div className="booking-header">
        <h1 className="booking-title">Book a Table</h1>
        <p className="booking-subtitle">Secure your fine dining reservation instantly</p>
      </div>

      <form onSubmit={handleConfirmBooking} className="booking-layout">
        {/* Left Side: Selectors & Map */}
        <div className="booking-form-col">
          {/* Step 1: Restaurant Grid */}
          <div className="booking-section-card">
            <h3>1. Select Restaurant</h3>
            <div className="booking-rest-grid">
              {dummyRestaurants.slice(0, 4).map((rest) => (
                <div
                  key={rest.id}
                  className={`booking-rest-card${selectedRest.id === rest.id ? ' selected' : ''}`}
                  onClick={() => setSelectedRest(rest)}
                >
                  <img src={rest.image} alt={rest.name} className="booking-rest-img" />
                  <div className="booking-rest-info">
                    <h4>{rest.name}</h4>
                    <div className="booking-rest-rating">
                      <IconStar />
                      <span>{rest.rating}</span>
                      <span className="bullet">&bull;</span>
                      <span>{rest.cuisine}</span>
                    </div>
                    <p className="booking-rest-loc">
                      <IconMapPin /> {rest.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step 2: Date, Guest & Time Slots */}
          <div className="booking-section-card">
            <h3>2. Reservation Details</h3>
            <div className="booking-details-grid">
              {/* Date Input */}
              <div className="booking-detail-field">
                <label>
                  <IconCalendar /> Date
                </label>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  required
                />
              </div>

              {/* Guest Count Pills */}
              <div className="booking-detail-field">
                <label>
                  <IconUsers /> Guests Count
                </label>
                <div className="guest-pills-row">
                  {GUEST_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      className={`guest-pill${guestCount === opt ? ' active' : ''}`}
                      onClick={() => setGuestCount(opt)}
                    >
                      {opt.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Time Slot Selector */}
            <div className="booking-detail-field time-section">
              <label>
                <IconClock /> Select Time Slot
              </label>
              <div className="time-slots-container">
                <div className="time-period-group">
                  <span className="period-label">Lunch Slots</span>
                  <div className="slots-row">
                    {TIME_SLOTS.filter(s => s.period === 'Lunch').map((slot) => (
                      <button
                        key={slot.label}
                        type="button"
                        className={`time-slot-btn${selectedTime === slot.label ? ' active' : ''}`}
                        onClick={() => setSelectedTime(slot.label)}
                      >
                        {slot.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="time-period-group">
                  <span className="period-label">Dinner Slots</span>
                  <div className="slots-row">
                    {TIME_SLOTS.filter(s => s.period === 'Dinner').map((slot) => (
                      <button
                        key={slot.label}
                        type="button"
                        className={`time-slot-btn${selectedTime === slot.label ? ' active' : ''}`}
                        onClick={() => setSelectedTime(slot.label)}
                      >
                        {slot.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Interactive Visual Seat Map */}
          <div className="booking-section-card">
            <div className="booking-section-header">
              <h3>3. Interactive Visual Seat Map</h3>
              <span className="seat-hint">Select your preferred table spot below</span>
            </div>

            <div className="seat-map-legend">
              <div className="legend-item"><span className="legend-dot available" /> Available</div>
              <div className="legend-item"><span className="legend-dot selected" /> Selected</div>
              <div className="legend-item"><span className="legend-dot reserved" /> Reserved</div>
            </div>

            <div className="visual-dining-hall">
              <div className="dining-stage">FRONT / BUFFET COUNTER</div>

              <div className="dining-floor">
                {SEAT_MAP_TABLES.map((table) => (
                  <button
                    key={table.id}
                    type="button"
                    className={`visual-table ${table.type}${table.reserved ? ' reserved' : ''}${selectedTable === table.id ? ' selected' : ''}`}
                    style={{ left: `${table.x}%`, top: `${table.y}%` }}
                    onClick={() => handleTableClick(table)}
                    title={`Table ${table.id} (Table for ${table.seats})`}
                  >
                    <span className="table-body">
                      <span className="table-id">{table.id}</span>
                      <span className="table-chairs">
                        {[...Array(table.seats)].map((_, i) => (
                          <span key={i} className="chair" />
                        ))}
                      </span>
                    </span>
                  </button>
                ))}
              </div>

              <div className="dining-entrance">ENTRANCE</div>
            </div>
          </div>
        </div>

        {/* Right Side: Form details review & contact details */}
        <div className="booking-summary-col">
          <div className="booking-summary-card">
            <h3>4. Booking Summary</h3>
            <div className="summary-details-list">
              <div className="summary-item">
                <span>Restaurant</span>
                <strong>{selectedRest.name}</strong>
              </div>
              <div className="summary-item">
                <span>Date</span>
                <strong>{bookingDate ? bookingDate.split('-').reverse().join('/') : 'Not selected'}</strong>
              </div>
              <div className="summary-item">
                <span>Time Slot</span>
                <strong>{selectedTime}</strong>
              </div>
              <div className="summary-item">
                <span>Guests</span>
                <strong>{guestCount}</strong>
              </div>
              <div className="summary-item">
                <span>Table Spot</span>
                <strong>{selectedTable ? `Table ${selectedTable}` : 'Please select table on map'}</strong>
              </div>
            </div>

            <div className="booking-contact-fields">
              <h4>Contact Information</h4>
              
              <div className="summary-input-group">
                <label htmlFor="bk-name">Full Name</label>
                <input
                  id="bk-name"
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="summary-input-group">
                <label htmlFor="bk-email">Email Address</label>
                <input
                  id="bk-email"
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="summary-input-group">
                <label htmlFor="bk-mobile">Mobile Number</label>
                <input
                  id="bk-mobile"
                  type="tel"
                  placeholder="Mobile Number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                />
              </div>

              <div className="summary-input-group">
                <label htmlFor="bk-pincode">Pin Code</label>
                <input
                  id="bk-pincode"
                  type="text"
                  placeholder="Postal Code"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  required
                />
              </div>

              <div className="summary-input-group">
                <label htmlFor="bk-notes">Special Requests (Optional)</label>
                <textarea
                  id="bk-notes"
                  placeholder="E.g. High chair for baby, window seat..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="booking-confirm-submit">
              Confirm Table Reservation
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default BookTable;
