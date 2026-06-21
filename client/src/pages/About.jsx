// src/pages/About.jsx
import React from 'react';
import './About.css';

// Import founders' photos from assets/team/
import kishoreImg from '../assets/team/kishore.jpg';
import kumareshImg from '../assets/team/kumaresh.jpg';
import kaviyanImg from '../assets/team/kaviyan.jpg';
import athithyanImg from '../assets/team/athithyan.jpg';

/* ─── SVG Icons ─── */
const IconTarget = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
  </svg>
);
const IconEye = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
);
const IconCode = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
  </svg>
);
const IconDatabase = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);
const IconLayout = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" />
  </svg>
);
const IconSmartphone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);
const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const IconVideo = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="23 7 16 12 23 17 23 7" />
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
  </svg>
);

const team = [
  {
    name: 'Kishore K.',
    degree: 'B.Tech AI & Data Science',
    year: '3rd Year, JNN Institute of Engineering',
    role: 'Team Lead, Architecture Planner, Full Stack Developer',
    desc: 'Kishore led the project vision, managed component design, and built the full authentication & order system.',
    icon: <IconCode />,
    initial: 'K',
    image: kishoreImg,
  },
  {
    name: 'Kumaresh S.',
    degree: 'B.E Computer Science',
    year: '3rd Year, JNN Institute of Engineering',
    role: 'Backend Developer, API & Middleware Expert',
    desc: 'Kumaresh handled database operations, API development, JWT security, and error handling.',
    icon: <IconDatabase />,
    initial: 'K',
    image: kumareshImg,
  },
  {
    name: 'Kaviyan A.',
    degree: 'B.Tech AI & Data Science',
    year: '3rd Year, JNN Institute of Engineering',
    role: 'Frontend Developer, UI/UX Specialist',
    desc: 'Kaviyan crafted modern user interfaces, category filters, and ensured a responsive, mobile-friendly experience.',
    icon: <IconLayout />,
    initial: 'K',
    image: kaviyanImg,
  },
  {
    name: 'Athithyan D.',
    degree: 'B.E Computer Science',
    year: '3rd Year, JNN Institute of Engineering',
    role: 'Frontend Developer, Navigation & Mobile Optimization',
    desc: 'Athithyan developed smooth navigation flows, mobile views, and contributed to responsive design fixes.',
    icon: <IconSmartphone />,
    initial: 'A',
    image: athithyanImg,
  },
];

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
          <p>
            To empower users with a seamless food ordering experience by integrating advanced technology,
            personalization, and responsive design — making food delivery not just easier, but smarter.
          </p>
        </div>
        <div className="about-pillar-card glow-card">
          <div className="about-pillar-icon"><IconEye /></div>
          <h3>Our Vision</h3>
          <p>
            To become a leading student-driven platform that supports local restaurants, promotes tech-driven
            solutions, and redefines how people discover and enjoy food — while encouraging innovation and learning.
          </p>
        </div>
      </div>

      {/* Team */}
      <div className="about-team-section">
        <div className="about-section-header reveal reveal-scale">
          <h2 className="about-section-title">Meet the Founders</h2>
          <p className="about-section-subtitle">The talented team behind EatzUp</p>
        </div>
        <div className="about-team-grid stagger-children visible">
          {team.map((member) => (
            <div className="about-team-card glow-card" key={member.name}>
              <div className="about-member-avatar">
                {member.image ? (
                  <img src={member.image} alt={member.name} className="about-member-img" />
                ) : (
                  <span className="about-member-initial">{member.initial}</span>
                )}
                <span className="about-member-role-icon">{member.icon}</span>
              </div>
              <div className="about-member-info">
                <h3 className="about-member-name">{member.name}</h3>
                <p className="about-member-degree">{member.degree}</p>
                <p className="about-member-year">{member.year}</p>
                <div className="about-member-role-badge">
                  {member.icon}
                  <span>{member.role.split(',')[0]}</span>
                </div>
                <p className="about-member-desc">{member.desc}</p>
              </div>
            </div>
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
