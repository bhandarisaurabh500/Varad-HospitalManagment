import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="premium-landing">
      <nav className="nav">
        <div className="brand">
          <div className="logo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6Z"/>
              <circle cx="12" cy="12" r="2.7"/>
            </svg>
          </div>
          <div>Varad Netralaya</div>
        </div>
        
        <div className={`links ${mobileMenuOpen ? 'flex flex-col absolute top-20 left-0 right-0 bg-white dark:bg-slate-900 p-4 shadow-lg rounded-xl z-50' : 'hidden md:flex'}`} style={mobileMenuOpen ? {display: 'flex'} : {}}>
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a>
          <a href="#doctor" onClick={() => setMobileMenuOpen(false)}>Specialist</a>
          <a href="#care" onClick={() => setMobileMenuOpen(false)}>Technology</a>
        </div>

        <div className="actions">
          <button className="theme" onClick={toggleDarkMode}>
            {darkMode ? '☾' : '☼'}
          </button>
          <Link className="btn btn-primary hidden md:inline-flex" to="/appointment">Book Appointment →</Link>
          <button 
            className="btn btn-ghost md:hidden" 
            style={{ display: 'grid', placeItems: 'center', width: '40px', padding: 0 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            ☰
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
