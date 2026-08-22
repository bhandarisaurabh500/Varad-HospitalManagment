import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const navGroups = [
  {
    title: 'Overview',
    links: [
      { to: '/admin/dashboard', label: 'Dashboard', icon: '⌂' },
      { to: '/admin/appointments', label: 'Appointments', icon: '◷' },
      { to: '/admin/patients', label: 'Patients', icon: '♙' },
      { to: '/admin/medical-records', label: 'EMR & Records', icon: '▤' },
    ]
  },
  {
    title: 'Management',
    links: [
      { to: '/admin/insurance', label: 'Insurance / TPA', icon: '◈' },
      { to: '/admin/guidelines', label: 'Guidelines', icon: '☷' },
      { to: '/admin/settings', label: 'Settings', icon: '⚙' },
    ]
  }
];

const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const { darkMode, toggleDarkMode } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // We are treating all authenticated users as the Admin/Doctor
  const userName = user?.email || 'Dr. Borude';

  const currentRouteName = navGroups
    .flatMap(g => g.links)
    .find(l => l.to === location.pathname)?.label || 'Overview';

  return (
    <div className="premium-admin">
      <div className="layout">
        
        <aside className={`sidebar ${mobileMenuOpen ? 'block' : 'hidden md:block'}`} style={mobileMenuOpen ? {display: 'block', zIndex: 100} : {}}>
          <div className="brand">
            <div className="logo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6Z"/>
                <circle cx="12" cy="12" r="2.7"/>
              </svg>
            </div>
            <div>Varad Netralaya<small>ADMIN PORTAL</small></div>
          </div>

          {navGroups.map((group, idx) => (
            <React.Fragment key={idx}>
              <div className="nav-title">{group.title}</div>
              <nav className="nav">
                {group.links.map(link => (
                  <Link 
                    key={link.to} 
                    to={link.to} 
                    className={location.pathname === link.to ? 'active' : ''}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="ico">{link.icon}</span>
                    <span>{link.label}</span>
                  </Link>
                ))}
              </nav>
            </React.Fragment>
          ))}
          
          <div className="sidebar-bottom">
            <div className="profile">
              <div className="avatar">DB</div>
              <div style={{ flex: 1 }}>
                <b>{userName}</b>
                <span>Administrator</span>
              </div>
              <button onClick={logout} title="Logout" style={{ color: '#ff8989', background: 'transparent' }}>
                ⎋
              </button>
            </div>
          </div>
        </aside>

        {mobileMenuOpen && (
          <div 
            className="md:hidden" 
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 90 }}
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        <div className="main" style={mobileMenuOpen ? {marginLeft: 0} : {}}>
          <header className="topbar">
            <div className="crumb">
              <button 
                className="md:hidden" 
                onClick={() => setMobileMenuOpen(true)}
                style={{ background: 'transparent', color: 'var(--text)', fontSize: '20px', marginRight: '15px' }}
              >
                ☰
              </button>
              <strong>Dashboard</strong> / {currentRouteName}
            </div>
            <div className="top-actions">
              <input className="search" placeholder="Search patients, records..." />
              <Link to="/" className="circle" title="View Website" style={{textDecoration:'none', color:'inherit'}}>
                ⌂
              </Link>
              <button className="circle" onClick={toggleDarkMode} title="Theme">
                {darkMode ? '☾' : '☼'}
              </button>
            </div>
          </header>
          
          <main className="content">
            {children}
          </main>
        </div>
        
      </div>
    </div>
  );
};

export default DashboardLayout;
