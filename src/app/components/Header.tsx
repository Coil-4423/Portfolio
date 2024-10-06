"use client";

import React, { useState } from 'react';
import Link  from 'next/link'; // Import for navigation using React Router
import '../css/header.css'; // Import your CSS file

const NavBar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false); // State to manage hamburger menu

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div className="logo">
        <Link href="/">My Portfolio</Link>
      </div>
      <nav className={`nav ${menuOpen ? 'open' : ''}`}>
        <ul className="nav-links">
          <li>
            <Link href="/" onClick={toggleMenu}>Home</Link>
          </li>
          <li>
            <Link href="/projects" onClick={toggleMenu}>Projects</Link>
          </li>
          <li>
            <Link href="/about" onClick={toggleMenu}>About</Link>
          </li>

        </ul>
      </nav>

      {/* <HamburgerMenu></HamburgerMenu> */}

      <div className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    {/* </header> */}
    </>
  );
};

export default NavBar;
