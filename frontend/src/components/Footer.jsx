import React from 'react';
import { Link } from 'react-router-dom';
import { hospitalInfo } from '../data/hospitalData';

const Footer = () => {
  return (
    <div className="premium-landing">
      <footer>
        <div className="container foot">
          <div>
            Varad Netralaya<br/>
            <strong>Expert Eye Care</strong><br/>
            <span style={{fontSize:'12px', color:'var(--muted)', display: 'block', marginTop: '10px', maxWidth: '300px'}}>
              {hospitalInfo.address}
            </span>
          </div>
          <div style={{textAlign: 'right'}}>
            <a href={`tel:${hospitalInfo.clinicPhone}`} style={{display:'block', color: 'var(--text)'}}>
              Call: {hospitalInfo.clinicPhone}
            </a>
            <a href={`mailto:${hospitalInfo.email}`} style={{display:'block', color: 'var(--muted)', fontSize: '12px', marginTop: '4px'}}>
              {hospitalInfo.email}
            </a>
            <Link to="/login" style={{color:'#0a9188', fontWeight:700, marginTop: '15px', display:'inline-block'}}>
              Admin Panel →
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
