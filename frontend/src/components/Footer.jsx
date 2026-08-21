import React from 'react';
import { hospitalInfo } from '../data/hospitalData';
import { Link } from 'react-router-dom';
import { 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaClock, 
  FaUserMd
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (href) => {
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
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-10 border-t border-slate-800 relative z-10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <FaUserMd className="text-4xl text-blue-500 bg-white p-2 rounded-xl shadow-md" />
              <div>
                <span className="text-xl font-bold tracking-tight text-white font-poppins">Dr. R.K.</span>
                <span className="text-xl font-light tracking-tight text-teal-400 ml-1">BORUDE</span>
                <p className="text-[10px] text-amber-400 font-semibold uppercase">{hospitalInfo.tagline}</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Dr. Raosaheb Kundlik Borude is a highly experienced Cataract, Glaucoma & Refractive Surgeon dedicated to providing modern, compassionate eye care.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-poppins">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              {['Home', 'Profile', 'Contact'].map((link) => {
                const href = link === 'Profile' ? '#doctor-profile' : `#${link.toLowerCase().replace(' ', '')}`;
                return (
                  <li key={link}>
                    <a
                      href={href}
                      onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
                      className="hover:text-teal-400 transition-colors flex items-center gap-1.5"
                    >
                      <span className="text-teal-500">•</span>
                      <span>{link}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Col 3: Specialties */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-poppins">
              Eye Specialties
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5"><span className="text-teal-400">•</span> Stitchless Phaco Cataract Surgery</li>
              <li className="flex items-center gap-1.5"><span className="text-teal-400">•</span> Computerized Eye Exam & Refraction</li>
              <li className="flex items-center gap-1.5"><span className="text-teal-400">•</span> Automated Perimetry (Visual Field)</li>
              <li className="flex items-center gap-1.5"><span className="text-teal-400">•</span> Diabetic Retina & Macular Care</li>
              <li className="flex items-center gap-1.5"><span className="text-teal-400">•</span> 100% Cashless Insurance Tie-ups</li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-poppins">
              Clinic Contact
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <p className="flex items-start gap-2">
                <FaMapMarkerAlt className="text-rose-500 text-sm flex-shrink-0 mt-0.5" />
                <span>{hospitalInfo.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <FaPhoneAlt className="text-teal-400 text-xs flex-shrink-0" />
                <a href={`tel:${hospitalInfo.phone}`} className="hover:text-teal-300 transition font-bold">{hospitalInfo.phone}</a>
              </p>
              <p className="flex items-center gap-2">
                <FaEnvelope className="text-teal-400 text-xs flex-shrink-0" />
                <a href={`mailto:${hospitalInfo.email}`} className="hover:text-teal-300 transition">{hospitalInfo.email}</a>
              </p>
              <p className="flex items-start gap-2 text-slate-400">
                <FaClock className="text-amber-400 text-xs flex-shrink-0 mt-0.5" />
                <span>{hospitalInfo.workingHours.weekdays}</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 gap-4">
          <p>© {currentYear} Dr. Raosaheb Kundlik Borude. All Rights Reserved.</p>
          <Link to="/login" className="bg-slate-800 hover:bg-teal-600 text-white px-4 py-2 rounded-lg font-bold transition-colors flex items-center gap-2 shadow-sm">
            <FaUserMd /> Admin Panel
          </Link>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
