import React from 'react';
import './About.css';
import kishoreImg from '../assets/team/kishore.jpg';
import kumareshImg from '../assets/team/kumaresh.jpg';
import kaviyanImg from '../assets/team/kaviyan.jpg';
import athithyanImg from '../assets/team/athithyan.jpg';

function About() {
  return (
    <div className="about-page">
      <h2 className="about-title">🍴 About EatzUp</h2>
      <p className="about-description">
        <strong>EatzUp</strong> is a student-built full stack food delivery platform that brings innovation and simplicity to your plate. 
        Designed with passion and precision, our app connects local restaurants with hungry customers, ensuring fast delivery and a delightful experience every time.
      </p>

      <h3 className="section-subtitle">🚀 Our Mission</h3>
      <p className="about-description">
        To empower users with a seamless and smart food ordering experience by integrating advanced technology, AI-based personalization, 
        and responsive design — making food delivery not just easier, but smarter.
      </p>

      <h3 className="section-subtitle">🌟 Our Vision</h3>
      <p className="about-description">
        To become a leading student-driven platform that supports local restaurants, promotes tech-driven solutions, 
        and redefines how people discover and enjoy food — all while encouraging innovation, collaboration, and learning.
      </p>

      <h3 className="section-subtitle">👨‍💻 Meet the Founders</h3>
      <div className="team-grid">
        <div className="team-member glass">
          <img src={kishoreImg} alt="Kishore Kumar" />
          <h4>Kishore K.</h4>
          <p>
            <span className="degree">B.Tech AI & Data Science</span><br />
            3rd Year, JNN Institute of Engineering<br />
            <strong>Role:</strong> Team Lead, Architecture Planner, Full Stack Developer<br />
            Kishore led the project vision, managed component design, and built the full authentication & order system.
          </p>
        </div>

        <div className="team-member glass">
          <img src={kumareshImg} alt="Kumaresh S." />
          <h4>Kumaresh S.</h4>
          <p>
            <span className="degree">B.E Computer Science</span><br />
            3rd Year, JNN Institute of Engineering<br />
            <strong>Role:</strong> Backend Developer, API & Middleware Expert<br />
            Kumaresh handled database operations, API development, JWT security, and error handling.
          </p>
        </div>

        <div className="team-member glass">
          <img src={kaviyanImg} alt="Kaviyan A." />
          <h4>Kaviyan A.</h4>
          <p>
            <span className="degree">B.Tech AI & Data Science</span><br />
            3rd Year, JNN Institute of Engineering<br />
            <strong>Role:</strong> Frontend Developer, UI/UX Specialist<br />
            Kaviyan crafted modern user interfaces, category filters, and ensured a responsive, mobile-friendly experience.
          </p>
        </div>

        <div className="team-member glass">
          <img src={athithyanImg} alt="Athithyan D." />
          <h4>Athithyan D.</h4>
          <p>
            <span className="degree">B.E Computer Science</span><br />
            3rd Year, JNN Institute of Engineering<br />
            <strong>Role:</strong> Frontend Developer, Navigation & Mobile Optimization<br />
            Athithyan developed smooth navigation flows, mobile views, and contributed to responsive design fixes.
          </p>
        </div>
      </div>

      {/* 🎥 Demo Video Section */}
      <h3 className="section-subtitle">🎬 EatzUp Demo</h3>
      <div className="video-container">
        <iframe
          src="https://www.loom.com/embed/7ef6e7d69813471d87d6547c005c8c82"
          title="EatzUp Demo"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          frameBorder="0"
          webkitallowfullscreen
          mozallowfullscreen
          allowFullScreen
        ></iframe>
      </div>

      {/* 📞 Contact Us CTA */}
      <div className="contact-cta">
        <h3>📞 Want to get in touch?</h3>
        <p>We’d love to hear from you! For queries, feedback, or collaborations, reach out to us at:</p>
        <a href="mailto:eatzup.team@gmail.com" className="cta-button">Contact Us</a>
      </div>
    </div>
  );
}

export default About;
