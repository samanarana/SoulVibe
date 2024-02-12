import React from 'react';
import './Footer.css';

import SoulvibeImage from './images/Soulvibe.png';

function Footer() {
  return (
    <section className="footer-section">
      <div className="footer-left">
        <div className="footer-image">
          <img src={SoulvibeImage} alt="Soulvibe" />
        </div>
        <div className="footer-words">
          <p className="footer-title">SoulVibe</p>
          <p className="message3">Find your healthy, and your happy.</p>
        </div>
      </div>

      <div className="saman">
        <p>created by</p>
        <h2>Saman Rana</h2>
        <a href="https://github.com/samanarana" target="_blank" rel="noopener noreferrer">Github</a>
        <a href="https://www.linkedin.com/in/samanarana/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="https://samanarana.github.io/portfolio/" target="_blank" rel="noopener noreferrer">Portfolio</a>
      </div>
    </section>
  );
}

export default Footer;
