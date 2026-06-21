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

function App() {
  const location = useLocation();
  const animFrameRef = useRef(null);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

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

      {/* ── Ambient floating orbs ── */}
      <div className="bg-orbs" aria-hidden="true">
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
        <div className="bg-orb bg-orb-3" />
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
