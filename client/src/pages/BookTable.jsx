// src/pages/BookTable.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './BookTable.css';
import html2pdf from 'html2pdf.js';
import logo from '../assets/logo.png';
import stamp1 from '../assets/stamp1.png';
import stamp2 from '../assets/stamp2.png';
import stamp3 from '../assets/stamp3.png';
import stamp4 from '../assets/stamp4.png';
import gpayImg    from '../assets/payment/gpay.png';
import phonepeImg from '../assets/payment/phonepe.png';
import upiImg     from '../assets/payment/upi.png';
import visaImg    from '../assets/payment/visa.png';
import netbankImg from '../assets/payment/netbanking.png';
import codImg     from '../assets/payment/cod.png';

/* ─── SVG Icons ─── */
const IconStar      = () => <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>;
const IconMapPin    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const IconCalendar  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const IconUsers     = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>;
const IconClock     = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const IconCheck     = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>;
const IconCreditCard= () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>;
const IconDownload  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
const IconArrowLeft = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>;
const IconArrowRight= () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
const IconChair     = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 3v16M19 3v16M5 11h14M5 19h14"/></svg>;

const TIME_SLOTS = [
  { label: '12:00 PM', period: 'Lunch' },
  { label: '1:00 PM',  period: 'Lunch' },
  { label: '2:00 PM',  period: 'Lunch' },
  { label: '7:00 PM',  period: 'Dinner' },
  { label: '8:00 PM',  period: 'Dinner' },
  { label: '9:00 PM',  period: 'Dinner' },
];
const GUEST_OPTIONS = ['1','2','3','4','5','6+'];
const SEAT_MAP_TABLES = [
  { id: 'T1', type: 'small',  seats: 2, x: 12, y: 20, reserved: false },
  { id: 'T2', type: 'small',  seats: 2, x: 40, y: 20, reserved: true  },
  { id: 'T3', type: 'medium', seats: 4, x: 68, y: 20, reserved: false },
  { id: 'T4', type: 'medium', seats: 4, x: 12, y: 58, reserved: false },
  { id: 'T5', type: 'large',  seats: 6, x: 40, y: 58, reserved: false },
  { id: 'T6', type: 'medium', seats: 4, x: 68, y: 58, reserved: true  },
];
const PAYMENT_METHODS = [
  { name: 'GPay',            img: gpayImg },
  { name: 'PhonePe',        img: phonepeImg },
  { name: 'UPI',             img: upiImg },
  { name: 'Visa/Mastercard', img: visaImg },
  { name: 'Net Banking',     img: netbankImg },
  { name: 'Cash',            img: codImg },
];
const STEPS = ['Select Restaurant', 'Reservation Details', 'Seat Map', 'Booking Summary'];

function BookTable() {
  const navigate    = useNavigate();
  const location    = useLocation();
  const ticketRef   = useRef(null);
  const restaurantFromState = location.state;

  const [step, setStep]               = useState(restaurantFromState ? 2 : 1);
  const [restaurant, setRestaurant]   = useState(restaurantFromState || null);
  const [bookingDate, setBookingDate] = useState('');
  const [guestCount, setGuestCount]   = useState('2');
  const [selectedTime, setSelectedTime] = useState('7:00 PM');
  const [selectedTable, setSelectedTable] = useState(null);
  const [name, setName]               = useState('');
  const [email, setEmail]             = useState('');
  const [mobile, setMobile]           = useState('');
  const [notes, setNotes]             = useState('');
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [paid, setPaid]               = useState(false);
  const [bookingRef] = useState(() => 'ETZ' + Math.floor(100000 + Math.random() * 900000));

  useEffect(() => {
    const cached = localStorage.getItem('eatzup_user');
    if (cached) {
      const u = JSON.parse(cached);
      setName(u.name || '');
      setEmail(u.email || '');
      setMobile(u.mobile || '');
    }
    const tm = new Date(); tm.setDate(tm.getDate() + 1);
    setBookingDate(tm.toISOString().split('T')[0]);
  }, []);

  const handleTableClick = (t) => {
    if (t.reserved) return;
    setSelectedTable(prev => prev === t.id ? null : t.id);
  };

  const downloadPDF = async () => {
    await html2pdf().set({
      margin: [8, 8, 8, 8],
      filename: `EatzUp_Reservation_${bookingRef}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    }).from(ticketRef.current).save();
  };

  const handlePayAndConfirm = async (e) => {
    e.preventDefault();
    if (!paymentMethod) return;
    await downloadPDF();
    setPaid(true);
  };

  /* ── Success / Ticket Screen ── */
  if (paid) {
    return (
      <div className="bkt-success-screen">
        <div className="bkt-success-icon"><IconCheck /></div>
        <h1>Reservation Confirmed!</h1>
        <p>Your table at <strong>{restaurant?.name}</strong> is booked.</p>
        <p className="bkt-success-sub">Reservation ticket PDF downloaded. See you there!</p>
        <button className="bkt-home-btn" onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  return (
    <div className="bkt-page">
      {/* Header */}
      <div className="bkt-header">
        <button className="bkt-back-nav" onClick={() => navigate('/restaurants')} aria-label="Back to restaurants">
          <IconArrowLeft /> Restaurants
        </button>
        <h1 className="bkt-title">Book a Table</h1>
        <p className="bkt-subtitle">Secure your fine dining reservation instantly</p>
      </div>

      {/* Step Progress */}
      <div className="bkt-steps-bar">
        {STEPS.map((s, i) => (
          <div key={i} className={`bkt-step-item${step === i+1 ? ' active' : ''}${step > i+1 ? ' done' : ''}`}>
            <div className="bkt-step-circle">{step > i+1 ? <IconCheck /> : i+1}</div>
            <span className="bkt-step-name">{s}</span>
          </div>
        ))}
      </div>

      <div className="bkt-body">
        {/* ── Step 1: Restaurant confirmed ── */}
        {step === 1 && (
          <div className="bkt-step-panel">
            <h2 className="bkt-panel-title">Choose Your Restaurant</h2>
            <p className="bkt-panel-sub">Select a restaurant from the list on the Restaurants page, or continue below.</p>
            <div className="bkt-rest-note">
              <IconMapPin /> Please go back to the Restaurants page and click "Book a Table" on a specific restaurant.
            </div>
            <button className="bkt-primary-btn" onClick={() => navigate('/restaurants')}>
              <IconMapPin /> Go to Restaurants
            </button>
          </div>
        )}

        {/* ── Step 2: Reservation Details ── */}
        {step === 2 && (
          <div className="bkt-step-panel">
            {restaurant && (
              <div className="bkt-rest-confirm-card">
                <img src={restaurant.image} alt={restaurant.name} className="bkt-rest-confirm-img" />
                <div className="bkt-rest-confirm-info">
                  <h3>{restaurant.name}</h3>
                  <p><IconMapPin /> {restaurant.location}</p>
                  <p><IconStar /> {restaurant.rating} · {restaurant.cuisine}</p>
                </div>
              </div>
            )}
            <div className="bkt-fee-notice">
              <IconCreditCard /> A reservation fee of <strong>₹100</strong> is required to confirm your booking.
            </div>
            <div className="bkt-fields-grid">
              <div className="bkt-field">
                <label><IconCalendar /> Date</label>
                <input type="date" value={bookingDate} onChange={e => setBookingDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]} className="bkt-input" required />
              </div>
              <div className="bkt-field">
                <label><IconUsers /> Number of Guests</label>
                <div className="bkt-pills">
                  {GUEST_OPTIONS.map(g => (
                    <button key={g} type="button"
                      className={`bkt-pill${guestCount === g ? ' active' : ''}`}
                      onClick={() => setGuestCount(g)}>{g}</button>
                  ))}
                </div>
              </div>
              <div className="bkt-field">
                <label><IconClock /> Time Slot</label>
                <div className="bkt-time-sections">
                  <p className="bkt-period">Lunch</p>
                  <div className="bkt-pills">
                    {TIME_SLOTS.filter(t => t.period === 'Lunch').map(t => (
                      <button key={t.label} type="button"
                        className={`bkt-pill${selectedTime === t.label ? ' active' : ''}`}
                        onClick={() => setSelectedTime(t.label)}>{t.label}</button>
                    ))}
                  </div>
                  <p className="bkt-period">Dinner</p>
                  <div className="bkt-pills">
                    {TIME_SLOTS.filter(t => t.period === 'Dinner').map(t => (
                      <button key={t.label} type="button"
                        className={`bkt-pill${selectedTime === t.label ? ' active' : ''}`}
                        onClick={() => setSelectedTime(t.label)}>{t.label}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="bkt-nav-row">
              <span />
              <button className="bkt-primary-btn" onClick={() => setStep(3)}>
                Continue <IconArrowRight />
              </button>
            </div>
          </div>
        )}

        {/* ── Step 3: Seat Map ── */}
        {step === 3 && (
          <div className="bkt-step-panel">
            <div className="bkt-legend">
              <span><span className="bkt-dot available" />Available</span>
              <span><span className="bkt-dot selected" />Selected</span>
              <span><span className="bkt-dot reserved" />Reserved</span>
            </div>
            <div className="bkt-dining-hall">
              <div className="bkt-stage">BUFFET / FRONT COUNTER</div>
              <div className="bkt-floor">
                {SEAT_MAP_TABLES.map(t => (
                  <button key={t.id} type="button"
                    className={`bkt-table-btn ${t.type}${t.reserved ? ' reserved' : ''}${selectedTable === t.id ? ' selected' : ''}`}
                    style={{ left: `${t.x}%`, top: `${t.y}%` }}
                    onClick={() => handleTableClick(t)}
                    title={`Table ${t.id} – ${t.seats} seats${t.reserved ? ' (Reserved)' : ''}`}
                  >
                    <span className="bkt-table-id">{t.id}</span>
                    <span className="bkt-table-seats"><IconChair />{t.seats}</span>
                  </button>
                ))}
              </div>
              <div className="bkt-entrance">ENTRANCE</div>
            </div>
            {!selectedTable && <p className="bkt-hint">Please select an available table above.</p>}
            <div className="bkt-nav-row">
              <button className="bkt-outline-btn" onClick={() => setStep(2)}><IconArrowLeft /> Back</button>
              <button className="bkt-primary-btn" disabled={!selectedTable} onClick={() => setStep(4)}>
                Continue <IconArrowRight />
              </button>
            </div>
          </div>
        )}

        {/* ── Step 4: Booking Summary + Pay ── */}
        {step === 4 && (
          <div className="bkt-step4-layout">
            {/* Ticket Preview for PDF */}
            <div className="bkt-ticket-col" ref={ticketRef}>
              <div className="bkt-ticket-brand">
                <img src={logo} alt="EatzUp" className="bkt-ticket-logo" />
                <span className="bkt-ticket-brand-name">EatzUp</span>
              </div>
              <div className="bkt-ticket-card">
                <div className="bkt-ticket-header">
                  <h2>Reservation Ticket</h2>
                  <p className="bkt-ticket-ref">Ref: <strong>{bookingRef}</strong></p>
                </div>
                <div className="bkt-ticket-grid">
                  <div className="bkt-ticket-item"><span>Restaurant</span><strong>{restaurant?.name}</strong></div>
                  <div className="bkt-ticket-item"><span>Location</span><strong>{restaurant?.location}</strong></div>
                  <div className="bkt-ticket-item"><span>Date</span><strong>{bookingDate.split('-').reverse().join('/')}</strong></div>
                  <div className="bkt-ticket-item"><span>Time</span><strong>{selectedTime}</strong></div>
                  <div className="bkt-ticket-item"><span>Guests</span><strong>{guestCount}</strong></div>
                  <div className="bkt-ticket-item"><span>Table</span><strong>Table {selectedTable}</strong></div>
                  <div className="bkt-ticket-item"><span>Guest Name</span><strong>{name}</strong></div>
                  <div className="bkt-ticket-item"><span>Mobile</span><strong>{mobile}</strong></div>
                  <div className="bkt-ticket-item bkt-fee-row"><span>Reservation Fee</span><strong className="bkt-fee">₹100</strong></div>
                </div>
                <div className="bkt-stamps-row">
                  <p className="bkt-stamps-label">Authorised by Founders</p>
                  <div className="bkt-stamps-grid">
                    <img src={stamp1} alt="Stamp 1" className="bkt-stamp" />
                    <img src={stamp2} alt="Stamp 2" className="bkt-stamp" />
                    <img src={stamp3} alt="Stamp 3" className="bkt-stamp" />
                    <img src={stamp4} alt="Stamp 4" className="bkt-stamp" />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Side */}
            <form className="bkt-payment-col" onSubmit={handlePayAndConfirm}>
              <h3 className="bkt-payment-title">Your Details & Payment</h3>
              <div className="bkt-contact-fields">
                <div className="bkt-field"><label>Full Name *</label><input className="bkt-input" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" required /></div>
                <div className="bkt-field"><label>Mobile *</label><input className="bkt-input" type="tel" value={mobile} onChange={e => setMobile(e.target.value)} placeholder="+91 98765 43210" required /></div>
                <div className="bkt-field"><label>Email</label><input className="bkt-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" /></div>
                <div className="bkt-field"><label>Special Requests</label><textarea className="bkt-input bkt-textarea" value={notes} onChange={e => setNotes(e.target.value)} placeholder="E.g. Window seat, baby chair..." /></div>
              </div>

              <h4 className="bkt-pay-method-title">Select Payment Method</h4>
              <div className="bkt-pay-methods">
                {PAYMENT_METHODS.map(({ name, img }) => (
                  <button key={name} type="button"
                    className={`bkt-pay-method${paymentMethod === name ? ' selected' : ''}`}
                    onClick={() => setPaymentMethod(name)}
                  >
                    <img src={img} alt={name} className="bkt-pay-method-img" />
                    <span>{name}</span>
                    {paymentMethod === name && <span className="bkt-pay-check"><IconCheck /></span>}
                  </button>
                ))}
              </div>

              <div className="bkt-nav-row">
                <button type="button" className="bkt-outline-btn" onClick={() => setStep(3)}><IconArrowLeft /> Back</button>
                <button type="submit" className={`bkt-pay-btn${!paymentMethod ? ' disabled' : ''}`} disabled={!paymentMethod}>
                  <IconDownload /> Pay ₹100 & Download Ticket
                </button>
              </div>
              {!paymentMethod && <p className="bkt-pay-hint">Please select a payment method.</p>}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookTable;
