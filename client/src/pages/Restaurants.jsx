// src/pages/Restaurants.jsx
import React, { useState, useEffect } from 'react';
import './Restaurants.css';
import { useLocation, useNavigate } from 'react-router-dom';

import rest1 from '../assets/restaurants/rest1.jpg';
import rest2 from '../assets/restaurants/rest2.jpg';
import rest3 from '../assets/restaurants/rest3.jpg';
import rest4 from '../assets/restaurants/rest4.jpg';
import rest5 from '../assets/restaurants/rest5.jpg';

/* ─── SVG Icons ─── */
const IconSearch  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
const IconStar    = () => <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>;
const IconMapPin  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const IconFilter  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>;
const IconCalendar= () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const IconUsers   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>;
const IconClock   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const IconCheck   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>;
const IconX       = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const IconChair   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 3v16M19 3v16M5 11h14M5 19h14"/></svg>;
const IconCreditCard = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>;

// Eagerly load all restaurant images from src/rest
const restImages = import.meta.glob('../rest/*.png', { eager: true });

const getRestaurantImage = (name) => {
  const key = Object.keys(restImages).find(k => {
    const filename = k.split('/').pop();
    const nameWithoutExt = filename.substring(0, filename.lastIndexOf('.'));
    return nameWithoutExt.toLowerCase() === name.toLowerCase();
  });
  return key ? restImages[key].default : null;
};

const rawRestaurants = [
  { id: 1,  name: 'Tandoori Tadka',   location: 'Chennai',     cuisine: 'North Indian', rating: 4.5, image: rest1 },
  { id: 2,  name: 'South Feast',      location: 'Madurai',     cuisine: 'South Indian', rating: 4.2, image: rest2 },
  { id: 3,  name: 'Pasta Villa',      location: 'Salem',       cuisine: 'Italian',      rating: 4.1, image: rest3 },
  { id: 4,  name: 'Rice & Spice',     location: 'Trichy',      cuisine: 'South Indian', rating: 4.3, image: rest4 },
  { id: 5,  name: 'PizzaCraft',       location: 'Hyderabad',   cuisine: 'Italian',      rating: 4.6, image: rest5 },
  { id: 6,  name: 'Biryani Express',  location: 'Chennai',     cuisine: 'North Indian', rating: 4.4, image: rest1 },
  { id: 7,  name: 'Curry Pot',        location: 'Trivandrum',  cuisine: 'South Indian', rating: 4.2, image: rest2 },
  { id: 8,  name: 'Delizioso',        location: 'Coimbatore',  cuisine: 'Italian',      rating: 4.5, image: rest3 },
  { id: 9,  name: 'Masala Nation',    location: 'Bangalore',   cuisine: 'North Indian', rating: 4.1, image: rest4 },
  { id: 10, name: 'Hot Tawa',         location: 'Madurai',     cuisine: 'South Indian', rating: 4.0, image: rest5 },
  { id: 11, name: 'Zesty Italian',    location: 'Trichy',      cuisine: 'Italian',      rating: 4.3, image: rest1 },
  { id: 12, name: 'Spice Route',      location: 'Coimbatore',  cuisine: 'North Indian', rating: 4.6, image: rest2 },
];

export const dummyRestaurants = rawRestaurants.map(r => ({
  ...r,
  image: getRestaurantImage(r.name) || r.image
}));

/* ─── Seat Map ─── */
const SEAT_MAP_TABLES = [
  { id: 'T1', type: 'small',  seats: 2, x: 12, y: 20, reserved: false },
  { id: 'T2', type: 'small',  seats: 2, x: 40, y: 20, reserved: true  },
  { id: 'T3', type: 'medium', seats: 4, x: 68, y: 20, reserved: false },
  { id: 'T4', type: 'medium', seats: 4, x: 12, y: 58, reserved: false },
  { id: 'T5', type: 'large',  seats: 6, x: 40, y: 58, reserved: false },
  { id: 'T6', type: 'medium', seats: 4, x: 68, y: 58, reserved: true  },
];
const TIME_SLOTS   = ['12:00 PM','1:00 PM','2:00 PM','7:00 PM','8:00 PM','9:00 PM'];
const GUEST_OPTIONS= ['1','2','3','4','5','6+'];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

/* ─── Booking Modal ─── */
function BookingModal({ restaurant, onClose }) {
  const [step, setStep] = useState(1);
  const [bookingDate,   setBookingDate]   = useState('');
  const [guestCount,    setGuestCount]    = useState('2');
  const [selectedTime,  setSelectedTime]  = useState('7:00 PM');
  const [selectedTable, setSelectedTable] = useState(null);
  const [name,  setName]  = useState('');
  const [mobile,setMobile]= useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [paid,  setPaid]  = useState(false);
  const [bookingRef] = useState(() => 'ETZ' + Math.floor(100000 + Math.random() * 900000));

  useEffect(() => {
    // Pre-fill from user
    const cached = localStorage.getItem('eatzup_user');
    if (cached) {
      const u = JSON.parse(cached);
      setName(u.name || '');
      setMobile(u.mobile || '');
      setEmail(u.email || '');
    }
    // Default date = tomorrow
    const tm = new Date(); tm.setDate(tm.getDate() + 1);
    setBookingDate(tm.toISOString().split('T')[0]);
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleTableClick = (t) => {
    if (t.reserved) return;
    setSelectedTable(prev => prev === t.id ? null : t.id);
  };

  const handleConfirmPay = (e) => {
    e.preventDefault();
    if (!name || !mobile) { alert('Please fill in your name and mobile number.'); return; }
    setPaid(true);
  };

  if (paid) {
    return (
      <div className="booking-modal-overlay" onClick={onClose}>
        <div className="booking-modal booking-success-modal" onClick={e => e.stopPropagation()}>
          <div className="booking-success-wrap">
            <div className="bk-success-circle"><IconCheck /></div>
            <h2>Reservation Confirmed!</h2>
            <p className="bk-ref">Ref: <strong>{bookingRef}</strong></p>
            <div className="bk-success-grid">
              <div className="bk-success-item"><span>Restaurant</span><strong>{restaurant.name}</strong></div>
              <div className="bk-success-item"><span>Location</span><strong>{restaurant.location}</strong></div>
              <div className="bk-success-item"><span>Date</span><strong>{bookingDate.split('-').reverse().join('/')}</strong></div>
              <div className="bk-success-item"><span>Time</span><strong>{selectedTime}</strong></div>
              <div className="bk-success-item"><span>Guests</span><strong>{guestCount}</strong></div>
              <div className="bk-success-item"><span>Table</span><strong>Table {selectedTable}</strong></div>
              <div className="bk-success-item"><span>Booking Fee</span><strong style={{color:'#059669'}}>₹100 Paid</strong></div>
            </div>
            <button className="bk-close-btn" onClick={onClose}>Done</button>
          </div>
        </div>
      </div>
    );
  }

  const steps = ['Select Restaurant','Reservation Details','Seat Map','Booking Summary'];

  return (
    <div className="booking-modal-overlay" onClick={onClose}>
      <div className="booking-modal" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="bk-modal-header">
          <div>
            <h2 className="bk-modal-title">Book a Table</h2>
            <p className="bk-modal-sub">{restaurant.name} · {restaurant.location}</p>
          </div>
          <button className="bk-modal-close" onClick={onClose} aria-label="Close"><IconX /></button>
        </div>

        {/* Steps Progress */}
        <div className="bk-steps">
          {steps.map((s, i) => (
            <div key={i} className={`bk-step${step === i+1 ? ' active' : ''}${step > i+1 ? ' done' : ''}`}>
              <div className="bk-step-dot">{step > i+1 ? <IconCheck /> : i+1}</div>
              <span className="bk-step-label">{s}</span>
            </div>
          ))}
        </div>

        <div className="bk-body">
          {/* ── Step 1: Restaurant confirmed ── */}
          {step === 1 && (
            <div className="bk-step-content">
              <div className="bk-restaurant-confirm">
                <img src={restaurant.image} alt={restaurant.name} className="bk-rest-img" />
                <div className="bk-rest-details">
                  <h3>{restaurant.name}</h3>
                  <p><IconMapPin /> {restaurant.location}</p>
                  <p><IconStar /> {restaurant.rating} · {restaurant.cuisine}</p>
                </div>
              </div>
              <div className="bk-note">
                <strong>Note:</strong> A reservation fee of <strong>₹100</strong> is required to confirm your table booking.
              </div>
              <button className="bk-next-btn" onClick={() => setStep(2)}>Continue →</button>
            </div>
          )}

          {/* ── Step 2: Reservation Details ── */}
          {step === 2 && (
            <div className="bk-step-content">
              <div className="bk-field">
                <label><IconCalendar /> Date</label>
                <input type="date" value={bookingDate} onChange={e => setBookingDate(e.target.value)} min={new Date().toISOString().split('T')[0]} className="bk-input" required />
              </div>
              <div className="bk-field">
                <label><IconUsers /> Number of Guests</label>
                <div className="bk-guest-pills">
                  {GUEST_OPTIONS.map(g => (
                    <button key={g} type="button" className={`bk-guest-pill${guestCount === g ? ' active' : ''}`} onClick={() => setGuestCount(g)}>{g}</button>
                  ))}
                </div>
              </div>
              <div className="bk-field">
                <label><IconClock /> Time Slot</label>
                <div className="bk-time-group">
                  <p className="bk-period-label">Lunch</p>
                  <div className="bk-time-pills">
                    {TIME_SLOTS.slice(0,3).map(t => (
                      <button key={t} type="button" className={`bk-time-pill${selectedTime === t ? ' active' : ''}`} onClick={() => setSelectedTime(t)}>{t}</button>
                    ))}
                  </div>
                  <p className="bk-period-label">Dinner</p>
                  <div className="bk-time-pills">
                    {TIME_SLOTS.slice(3).map(t => (
                      <button key={t} type="button" className={`bk-time-pill${selectedTime === t ? ' active' : ''}`} onClick={() => setSelectedTime(t)}>{t}</button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bk-nav-row">
                <button className="bk-back-btn" onClick={() => setStep(1)}>← Back</button>
                <button className="bk-next-btn" onClick={() => setStep(3)}>Continue →</button>
              </div>
            </div>
          )}

          {/* ── Step 3: Seat Map ── */}
          {step === 3 && (
            <div className="bk-step-content">
              <div className="bk-map-legend">
                <span className="bk-legend-dot available" />Available
                <span className="bk-legend-dot selected" />Selected
                <span className="bk-legend-dot reserved" />Reserved
              </div>
              <div className="bk-dining-hall">
                <div className="bk-stage">BUFFET / FRONT COUNTER</div>
                <div className="bk-floor">
                  {SEAT_MAP_TABLES.map(t => (
                    <button
                      key={t.id}
                      type="button"
                      className={`bk-table ${t.type}${t.reserved ? ' reserved' : ''}${selectedTable === t.id ? ' selected' : ''}`}
                      style={{ left: `${t.x}%`, top: `${t.y}%` }}
                      onClick={() => handleTableClick(t)}
                      title={`Table ${t.id} – ${t.seats} seats${t.reserved ? ' (Reserved)' : ''}`}
                    >
                      <span className="bk-table-id">{t.id}</span>
                      <span className="bk-table-seats">{t.seats}👤</span>
                    </button>
                  ))}
                </div>
                <div className="bk-entrance">ENTRANCE</div>
              </div>
              {!selectedTable && <p className="bk-hint">Please select an available table above.</p>}
              <div className="bk-nav-row">
                <button className="bk-back-btn" onClick={() => setStep(2)}>← Back</button>
                <button className="bk-next-btn" disabled={!selectedTable} onClick={() => setStep(4)}>Continue →</button>
              </div>
            </div>
          )}

          {/* ── Step 4: Booking Summary + Pay ── */}
          {step === 4 && (
            <form className="bk-step-content" onSubmit={handleConfirmPay}>
              <div className="bk-summary-grid">
                <div className="bk-summary-item"><span>Restaurant</span><strong>{restaurant.name}</strong></div>
                <div className="bk-summary-item"><span>Date</span><strong>{bookingDate.split('-').reverse().join('/')}</strong></div>
                <div className="bk-summary-item"><span>Time</span><strong>{selectedTime}</strong></div>
                <div className="bk-summary-item"><span>Guests</span><strong>{guestCount}</strong></div>
                <div className="bk-summary-item"><span>Table</span><strong>Table {selectedTable}</strong></div>
                <div className="bk-summary-item bk-fee-row"><span>Reservation Fee</span><strong className="bk-fee">₹100</strong></div>
              </div>
              <div className="bk-contact-fields">
                <h4>Your Details</h4>
                <div className="bk-field"><label>Full Name *</label><input className="bk-input" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" required /></div>
                <div className="bk-field"><label>Mobile *</label><input className="bk-input" type="tel" value={mobile} onChange={e => setMobile(e.target.value)} placeholder="+91 98765 43210" required /></div>
                <div className="bk-field"><label>Email</label><input className="bk-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" /></div>
                <div className="bk-field"><label>Special Requests</label><textarea className="bk-input bk-textarea" value={notes} onChange={e => setNotes(e.target.value)} placeholder="E.g. Window seat, baby chair…" /></div>
              </div>
              <div className="bk-nav-row">
                <button type="button" className="bk-back-btn" onClick={() => setStep(3)}>← Back</button>
                <button type="submit" className="bk-pay-btn"><IconCreditCard /> Pay ₹100 &amp; Confirm</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Restaurants Component ─── */
function Restaurants() {
  const query = useQuery();
  const navigate = useNavigate();
  const [search,  setSearch]  = useState('');
  const [cuisine, setCuisine] = useState('All');


  useEffect(() => {
    const loc = query.get('location');
    if (loc) setSearch(loc);
  }, []);

  const cuisines = ['All', 'North Indian', 'South Indian', 'Italian'];
  const filtered = dummyRestaurants.filter(r => {
    const matchSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.location.toLowerCase().includes(search.toLowerCase()) ||
      r.cuisine.toLowerCase().includes(search.toLowerCase());
    const matchCuisine = cuisine === 'All' || r.cuisine === cuisine;
    return matchSearch && matchCuisine;
  });

  return (
    <div className="restaurants-page">
      <div className="restaurants-header">
        <h1 className="restaurants-title">Restaurants Near You</h1>
        <p className="restaurants-subtitle">{dummyRestaurants.length} restaurants available for dining</p>
      </div>

      {/* Controls */}
      <div className="restaurants-controls">
        <div className="restaurants-search-wrap">
          <span className="restaurants-search-icon"><IconSearch /></span>
          <input
            type="text"
            placeholder="Search by name, location or cuisine..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="restaurants-search-input"
            aria-label="Search restaurants"
          />
        </div>
        <div className="restaurants-filter">
          <IconFilter />
          {cuisines.map(c => (
            <button
              key={c}
              className={`rest-filter-btn${cuisine === c ? ' active' : ''}`}
              onClick={() => setCuisine(c)}
            >{c}</button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="restaurants-empty">
          <IconSearch />
          <p>No restaurants match your search.</p>
        </div>
      ) : (
        <div className="restaurants-grid">
          {filtered.map(r => (
            <div className="rest-card" key={r.id}>
              <div className="rest-card-img-wrap">
                <img src={r.image} alt={r.name} className="rest-card-img" />
                <div className="rest-card-rating"><IconStar />{r.rating}</div>
              </div>
              <div className="rest-card-body">
                <h3 className="rest-card-name">{r.name}</h3>
                <p className="rest-card-cuisine">{r.cuisine}</p>
                <div className="rest-card-meta">
                  <span className="rest-card-location"><IconMapPin />{r.location}</span>
                </div>
                <button
                  className="rest-book-btn"
                  onClick={() => navigate('/book-table', { state: r })}
                  id={`book-table-${r.id}`}
                >
                  <IconCalendar /> Book a Table
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Restaurants;
