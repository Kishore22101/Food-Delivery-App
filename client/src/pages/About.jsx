// src/pages/About.jsx
import React, { useRef, useEffect } from 'react';
import './About.css';

import kishoreImg  from '../assets/team/kishore.jpg';
import kumareshImg from '../assets/team/kumaresh.jpg';
import kaviyanImg  from '../assets/team/kaviyan.jpg';
import athithyanImg from '../assets/team/athithyan.jpg';

/* ─── SVG Icons ─── */
const IconTarget   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>;
const IconEye      = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
const IconCode     = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>;
const IconDatabase = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>;
const IconLayout   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>;
const IconSmartphone = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>;
const IconMail     = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
const IconVideo    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>;
const IconLinkedin = () => <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>;

const team = [
  {
    name: 'Kishore K.',
    degree: 'B.Tech AI & Data Science',
    year: '3rd Year, JNN Institute of Engineering',
    role: 'Team Lead · Architecture · Full Stack Developer',
    roleShort: 'Team Lead',
    desc: 'Kishore led the project vision, managed component design, and built the full authentication & order system.',
    icon: <IconCode />,
    color: '#E8303A',
    image: kishoreImg,
  },
  {
    name: 'Kumaresh S.',
    degree: 'B.E Computer Science',
    year: '3rd Year, JNN Institute of Engineering',
    role: 'Backend Developer · API & Middleware Expert',
    roleShort: 'Backend Dev',
    desc: 'Kumaresh handled database operations, API development, JWT security, and error handling.',
    icon: <IconDatabase />,
    color: '#7C3AED',
    image: kumareshImg,
  },
  {
    name: 'Kaviyan A.',
    degree: 'B.Tech AI & Data Science',
    year: '3rd Year, JNN Institute of Engineering',
    role: 'Frontend Developer · UI/UX Specialist',
    roleShort: 'Frontend Dev',
    desc: 'Kaviyan crafted modern user interfaces, category filters, and ensured a responsive, mobile-friendly experience.',
    icon: <IconLayout />,
    color: '#0891B2',
    image: kaviyanImg,
  },
  {
    name: 'Athithyan D.',
    degree: 'B.E Computer Science',
    year: '3rd Year, JNN Institute of Engineering',
    role: 'Frontend Developer · Navigation & Mobile Optimization',
    roleShort: 'Mobile Dev',
    desc: 'Athithyan developed smooth navigation flows, mobile views, and contributed to responsive design fixes.',
    icon: <IconSmartphone />,
    color: '#059669',
    image: athithyanImg,
  },
];

/* ── Tilt-on-hover effect ── */
function FounderCard({ member, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width  / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -8;
      const rotY = ((x - cx) / cx) *  8;
      card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03)`;
    };
    const handleLeave = () => {
      card.style.transform = 'perspective(900px) rotateX(0) rotateY(0) scale(1)';
    };

    card.addEventListener('mousemove', handleMove);
    card.addEventListener('mouseleave', handleLeave);
    return () => {
      card.removeEventListener('mousemove', handleMove);
      card.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="founder-card"
      style={{ '--card-color': member.color, animationDelay: `${index * 0.15}s` }}
    >
      {/* Photo */}
      <div className="founder-photo-wrap">
        <div className="founder-photo-ring" />
        <img
          src={member.image}
          alt={member.name}
          className="founder-photo"
          onError={e => { e.target.style.display = 'none'; }}
        />
        <div className="founder-badge">
          <span className="founder-badge-icon">{member.icon}</span>
          <span>{member.roleShort}</span>
        </div>
      </div>

      {/* Info */}
      <div className="founder-info">
        <h3 className="founder-name">{member.name}</h3>
        <p className="founder-degree">{member.degree}</p>
        <p className="founder-year">{member.year}</p>
        <p className="founder-role">{member.role}</p>
        <p className="founder-desc">{member.desc}</p>
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="about-page">
      {/* Hero */}
      <div className="about-hero reveal animate-fade-in">
        <div className="about-hero-content">
          <div className="about-hero-badge">
            <IconCode />
            <span>Student-Built Project</span>
          </div>
          <h1 className="about-hero-title">
            About <span className="gradient-text-animated">EatzUp</span>
          </h1>
          <p className="about-hero-desc">
            EatzUp is a student-built full stack food delivery platform that brings innovation and simplicity to your plate.
            Designed with passion and precision, our app connects local restaurants with hungry customers —
            ensuring fast delivery and a delightful experience every time.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="about-pillars stagger-children visible">
        <div className="about-pillar-card glow-card">
          <div className="about-pillar-icon"><IconTarget /></div>
          <h3>Our Mission</h3>
          <p>To empower users with a seamless food ordering experience by integrating advanced technology, personalization, and responsive design — making food delivery not just easier, but smarter.</p>
        </div>
        <div className="about-pillar-card glow-card">
          <div className="about-pillar-icon"><IconEye /></div>
          <h3>Our Vision</h3>
          <p>To become a leading student-driven platform that supports local restaurants, promotes tech-driven solutions, and redefines how people discover and enjoy food — while encouraging innovation and learning.</p>
        </div>
      </div>

      {/* ── Founders ── */}
      <div className="founders-section">
        <div className="about-section-header reveal reveal-scale">
          <h2 className="about-section-title">Meet the Founders</h2>
          <p className="about-section-subtitle">The passionate team behind EatzUp</p>
        </div>

        <div className="founders-grid stagger-children visible">
          {team.map((member, idx) => (
            <FounderCard key={member.name} member={member} index={idx} />
          ))}
        </div>
      </div>

      {/* Demo Video */}
      <div className="about-demo-section reveal">
        <div className="about-section-header">
          <div className="about-demo-label"><IconVideo /><span>Demo</span></div>
          <h2 className="about-section-title">EatzUp in Action</h2>
        </div>
        <div className="about-video-wrap">
          <iframe
            src="https://www.loom.com/embed/7ef6e7d69813471d87d6547c005c8c82"
            title="EatzUp Demo Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

      {/* Contact CTA */}
      <div className="about-cta reveal">
        <div className="about-cta-icon"><IconMail /></div>
        <h2>Want to Get in Touch?</h2>
        <p>We'd love to hear from you. For queries, feedback, or collaborations, reach out to us.</p>
        <a href="mailto:eatzup.team@gmail.com" className="about-cta-btn press-active">
          <IconMail />
          Contact Us
        </a>
      </div>
    </div>
  );
}

export default About;
