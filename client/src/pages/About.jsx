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
const IconInstagram = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>;
const IconGithub   = () => <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>;
const IconLinkedin = () => <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>;

const team = [
  {
    name: 'Kishore K.',
    degree: 'B.Tech AI & Data Science',
    year: '4th Year, JNN Institute of Engineering',
    role: 'Team Lead · Architecture · Full Stack Developer',
    roleShort: 'Team Lead',
    desc: 'Kishore led the project vision, managed component design, and built the full authentication & order system.',
    icon: <IconCode />,
    color: '#7232e2ff',
    image: kishoreImg,
    email: 'kishore22oct@gmail.com',
    instagram: 'https://www.instagram.com/itz.kizzzy?igsh=emZxdXZ1aXFqeXBk',
    github: 'https://github.com/Kishore22101',
    linkedin: 'https://linkedin.com/in/kishore22101',
  },
  {
    name: 'Kumaresh S.',
    degree: 'B.E Computer Science',
    year: '4th Year, JNN Institute of Engineering',
    role: 'Backend Developer · API & Middleware Expert',
    roleShort: 'Backend Dev',
    desc: 'Kumaresh handled database operations, API development, JWT security, and error handling.',
    icon: <IconDatabase />,
    color: '#E8303A',
    image: kumareshImg,
    email: 'skumaresh200@gmail.com',
    instagram: 'https://www.instagram.com/__kumaresh__02?igsh=MTRvZGFhaWhtZDQ1dg==',
    github: 'https://github.com/Kumaresh200',
    linkedin: 'https://linkedin.com/in/kumaresh200',
  },
  {
    name: 'Kaviyan A.',
    degree: 'B.Tech AI & Data Science',
    year: '4th Year, JNN Institute of Engineering',
    role: 'Frontend Developer · UI/UX Specialist',
    roleShort: 'Frontend Dev',
    desc: 'Kaviyan crafted modern user interfaces, category filters, and ensured a responsive, mobile-friendly experience.',
    icon: <IconLayout />,
    color: '#0891B2',
    image: kaviyanImg,
    email: 'kaviyan5242@gmail.com',
    instagram: 'https://www.instagram.com/itzz_.kavi?igsh=MTc4cWxycTk5MmJ6NQ==',
    github: 'https://github.com/kaviyan1409',
    linkedin: 'https://linkedin.com/in/kaviyan1409',
  },
  {
    name: 'Athithyan D.',
    degree: 'B.E Computer Science',
    year: '4th Year, JNN Institute of Engineering',
    role: 'Frontend Developer · Navigation & Mobile Optimization',
    roleShort: 'Mobile Dev',
    desc: 'Athithyan developed smooth navigation flows, mobile views, and contributed to responsive design fixes.',
    icon: <IconSmartphone />,
    color: '#059669',
    image: athithyanImg,
    email: 'aaadhithyan77@gmail.com',
    instagram: 'https://www.instagram.com/aadhithyan56?igsh=dHhlcno4ZzdyZzUx',
    github: 'https://github.com/Athithyan123',
    linkedin: 'https://linkedin.com/in/athithyan123',
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

        {/* Social links */}
        <div className="founder-socials">
          {member.email && (
            <a href={`mailto:${member.email}`} className="founder-social-link" title="Email" target="_blank" rel="noreferrer">
              <IconMail />
            </a>
          )}
          {member.instagram && (
            <a href={member.instagram} className="founder-social-link" title="Instagram" target="_blank" rel="noreferrer">
              <IconInstagram />
            </a>
          )}
          {member.github && (
            <a href={member.github} className="founder-social-link" title="GitHub" target="_blank" rel="noreferrer">
              <IconGithub />
            </a>
          )}
          {member.linkedin && (
            <a href={member.linkedin} className="founder-social-link" title="LinkedIn" target="_blank" rel="noreferrer">
              <IconLinkedin />
            </a>
          )}
        </div>
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
