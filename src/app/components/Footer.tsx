'use client'

import React from 'react';
import '../css/Footer.css'; // Import any custom CSS if necessary

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-icons">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
          <img src="/path_to_github_icon" alt="GitHub" className="icon" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <img src="/path_to_linkedin_icon" alt="LinkedIn" className="icon" />
        </a>
        <a href="mailto:sumitake34@gmail.com">
          <img src="/path_to_email_icon" alt="Email" className="icon" />
        </a>
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
          <img src="/path_to_resume_icon" alt="Resume" className="icon" />
        </a>
      </div>
      <p>© 2024 Takehito Sumimura</p>
    </footer>
  );
};

export default Footer;
