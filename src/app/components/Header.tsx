"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link'; // Import for navigation using Next.js
import '../css/header.css'; // Import your CSS file

const NavBar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false); // State to manage hamburger menu
  const navRef = useRef<HTMLDivElement>(null); // Ref for the nav and hamburger area

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close the menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setMenuOpen(false); // Close the menu if clicking outside
      }
    };

    // Add event listener for clicks
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navRef]);
  

  return (
    <>
      <div className="logo">
        <Link href="/">My Portfolio</Link>
      </div>

      {/* Wrap the nav and hamburger in a div with the ref */}
      <div ref={navRef}>
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

        <div className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </>
  );
};

export default NavBar;
