import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { hospitalInfo } from '../data/hospitalData';
import {
  FaPhoneAlt,
  FaClock,
  FaMapMarkerAlt,
  FaSun,
  FaMoon,
  FaBars,
  FaTimes,
  FaCalendarCheck,
  FaShieldAlt,
  FaStar
} from 'react-icons/fa';

const Navbar = () => {
  const { darkMode, toggleDarkMode, openAppointmentModal } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Eye Treatments', href: '#treatments' },
    { name: 'Doctors', href: '#doctors' },
    { name: 'Insurance & Schemes', href: '#insurance' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = navLinks.map(link => link.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 95;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
      {/* Top Notification & Emergency Info Bar */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 text-white text-xs py-2 px-4 shadow-md border-b border-blue-800/40">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <div className="flex items-center gap-1 text-amber-400 font-bold bg-amber-950/80 px-3 py-0.5 rounded-full border border-amber-500/50 shadow-sm">
              <FaStar className="text-amber-400 animate-pulse" /> 4.9★ (439+ Google Reviews)
            </div>
            <span className="hidden sm:inline text-slate-600">|</span>
            <div className="hidden sm:flex items-center gap-1.5 text-slate-200">
              <FaClock className="text-teal-400" /> Mon - Sat: 8:00 AM – 9:00 PM
            </div>
            <span className="hidden lg:inline text-slate-600">|</span>
            <a 
              href={hospitalInfo.googleMapsLink} 
              target="_blank" 
              rel="noreferrer"
              className="hidden lg:flex items-center gap-1.5 text-slate-200 hover:text-amber-300 transition font-medium"
            >
              <FaMapMarkerAlt className="text-rose-400 animate-bounce" /> बालिकाश्रम रोड, सावेडी, अहिल्यानगर
            </a>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-teal-300 font-medium">
              <FaShieldAlt className="text-teal-400" /> Cashless Insurance Tie-ups
            </div>
            <a href={`tel:${hospitalInfo.phone}`} className="hidden md:inline-flex items-center gap-1 text-slate-200 hover:text-white transition font-bold">
              <FaPhoneAlt className="text-teal-400 text-[10px]" /> Call: {hospitalInfo.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`transition-all duration-300 ${
        isScrolled 
          ? 'glass-nav shadow-2xl py-2.5 border-b border-slate-200/80 dark:border-slate-800' 
          : 'bg-white/95 dark:bg-slate-950/95 py-3 border-b border-slate-200/50 dark:border-slate-800/80'
      }`}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Prominent Large HD Circular Emblem & Brand Title */}
          <a 
            href="#home" 
            onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
            className="flex items-center gap-4 group"
          >
            <div className="relative">
              {/* Glowing Outer Ring */}
              <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-amber-400 via-blue-600 to-teal-400 opacity-80 blur-sm group-hover:opacity-100 transition-opacity"></div>
              
              {/* Large HD Circular Emblem Container */}
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-full bg-white p-1 shadow-xl border-3 border-amber-400 flex items-center justify-center overflow-hidden">
                <img 
                  src="/Varadlogo_emblem.png" 
                  alt="वरद नेत्रालय HD Emblem" 
                  className="w-full h-full object-contain scale-110 group-hover:scale-125 transition-transform duration-300" 
                />
              </div>
            </div>

            <div>
              <div className="flex items-center leading-none">
                <span className="text-2xl sm:text-3xl font-black tracking-tight text-blue-950 dark:text-white font-poppins">VARAD</span>
                <span className="text-2xl sm:text-3xl font-bold tracking-tight text-teal-600 dark:text-teal-400 ml-1.5">NETRALAYA</span>
              </div>
              <p className="text-xs sm:text-sm font-extrabold text-amber-600 dark:text-amber-400 tracking-wider uppercase mt-1">
                वरद नेत्रालय • सावेडी, अहिल्यानगर
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className={`px-3 py-2 rounded-xl text-sm font-bold transition-all ${
                    isActive
                      ? 'text-blue-600 dark:text-teal-400 bg-blue-50 dark:bg-slate-800/90 shadow-sm'
                      : 'text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* Right Utilities & CTA */}
          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              aria-label="Toggle Dark Mode"
              className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-amber-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition shadow-inner border border-slate-200 dark:border-slate-700"
            >
              {darkMode ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
            </button>

            {/* Book Appointment CTA */}
            <button
              onClick={() => openAppointmentModal()}
              className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-blue-600 via-teal-500 to-emerald-500 hover:from-blue-700 hover:to-teal-600 text-white font-black text-sm px-6 py-3 rounded-full shadow-lg shadow-blue-500/25 hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              <FaCalendarCheck />
              <span>Book Appointment</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Open Menu"
              className="xl:hidden p-3 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 shadow-2xl px-4 pt-3 pb-6 animate-fadeIn">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className="px-4 py-3 rounded-lg text-slate-700 dark:text-slate-200 font-bold hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-teal-400 flex items-center justify-between"
              >
                <span>{link.name}</span>
                <span className="text-xs text-slate-400">→</span>
              </a>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-3">
            <button
              onClick={() => { setMobileMenuOpen(false); openAppointmentModal(); }}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-bold py-3.5 rounded-xl shadow-md text-base"
            >
              <FaCalendarCheck />
              <span>Book Appointment Now</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
