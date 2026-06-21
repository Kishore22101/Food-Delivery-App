// src/App.jsx
import React, { useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Restaurants from './pages/Restaurants';
import About from './pages/About';
import Account from './pages/Account';
import Orders from './pages/Orders';
import Cart from './pages/Cart';
import Categories from './pages/Categories';
import Footer from './components/Footer';
import Payment from './pages/Payment';
import BookTable from './pages/BookTable';

/* ── Floating SVG Components ── */
const LeafIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 8.48 17 11.5c0 3.12-2.33 6.78-6 8.5z" />
    <path d="M9 11c3 1.5 5.5.5 8-2.5" />
  </svg>
);
const PepperIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a4 4 0 0 0-4 4c0 .8.2 1.5.5 2.1C5 9.5 3 12.2 3 15.5c0 3.6 2.9 6.5 6.5 6.5 4.5 0 8-3.5 10.5-8 .6-1.1.8-2.3.8-3.5 0-3.3-2.7-6-6-6-1.1 0-2.1.3-3 .8C14.5 3.3 13.3 2 12 2z" />
  </svg>
);
const GrainIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 22l20-20" />
    <path d="M8 12a3 3 0 0 1-3-3 3 3 0 0 1 3 3z" />
    <path d="M12 8a3 3 0 0 1-3-3 3 3 0 0 1 3 3z" />
    <path d="M12 16a3 3 0 0 0 3-3 3 3 0 0 0-3 3z" />
  </svg>
);

function App() {
  const location = useLocation();
  const animFrameRef = useRef(null);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  // Scroll progress bar listener
  useEffect(() => {
    const handleScroll = () => {
      const bar = document.getElementById('scroll-progress-indicator');
      if (!bar) return;
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) {
        bar.style.width = '0%';
        return;
      }
      const scrollPercent = (window.scrollY / totalScroll) * 100;
      bar.style.width = `${scrollPercent}%`;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll Reveal — re-runs on every route change
  useEffect(() => {
    const run = () => {
      const els = document.querySelectorAll('.reveal:not(.revealed), .stagger-children:not(.visible)');
      if (!els.length) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            if (entry.target.classList.contains('stagger-children')) {
              entry.target.classList.add('visible');
            }
            observer.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -40px 0px', threshold: 0.05 });

      els.forEach(el => observer.observe(el));

      return () => observer.disconnect();
    };

    // Short delay so route components mount first
    const t = setTimeout(run, 80);
    return () => clearTimeout(t);
  }, [location.pathname]);

  // Canvas cursor trail — runs once, stays alive globally
  useEffect(() => {
    const canvas = document.getElementById('cursor-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let raf;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e) => {
      const mx = e.clientX, my = e.clientY;
      const count = 2;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: mx + (Math.random() - 0.5) * 6,
          y: my + (Math.random() - 0.5) * 6,
          r: Math.random() * 4 + 2,
          color: Math.random() > 0.5 ? '#E8303A' : '#ff6b6b',
          alpha: 0.8,
          decay: Math.random() * 0.025 + 0.018,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2,
        });
      }
    };
    window.addEventListener('mousemove', onMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles = particles.filter(p => p.alpha > 0.01);
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        p.alpha -= p.decay;
        p.r *= 0.97;
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0, p.r), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* ── Fixed canvas overlay — MUST be position:fixed via CSS id ── */}
      <canvas id="cursor-canvas" aria-hidden="true" />

      {/* ── Scroll Progress Indicator ── */}
      <div id="scroll-progress-indicator" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '3px',
        width: '0%',
        background: 'var(--brand-gradient)',
        zIndex: 100001,
        transition: 'width 0.08s ease-out',
        pointerEvents: 'none'
      }} />

      {/* ── Ambient floating orbs & decorative elements ── */}
      <div className="bg-orbs" aria-hidden="true">
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
        <div className="bg-orb bg-orb-3" />

        {/* Floating food icons */}
        <div className="floating-element float-icon-1"><LeafIcon /></div>
        <div className="floating-element float-icon-2"><PepperIcon /></div>
        <div className="floating-element float-icon-3"><GrainIcon /></div>
        <div className="floating-element float-icon-4"><LeafIcon /></div>
        <div className="floating-element float-icon-5"><PepperIcon /></div>
      </div>

      <Navbar />

      <main style={{ position: 'relative', zIndex: 1 }}>
        <Routes>
          <Route path="/"            element={<Home />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/about"       element={<About />} />
          <Route path="/account"     element={<Account />} />
          <Route path="/orders"      element={<Orders />} />
          <Route path="/cart"        element={<Cart />} />
          <Route path="/categories"  element={<Categories />} />
          <Route path="/payment"     element={<Payment />} />
          <Route path="/book-table"  element={<BookTable />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
