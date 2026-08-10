import React from 'react';
import { hospitalInfo } from '../data/hospitalData';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaYoutube, 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaClock, 
  FaHeart,
  FaShieldAlt,
  FaAmbulance,
  FaExternalLinkAlt 
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
              <img 
                src={hospitalInfo.logo} 
                alt="Varad Netralaya Logo" 
                className="h-12 w-auto object-contain bg-white p-1 rounded-xl shadow-md"
              />
              <div>
                <span className="text-xl font-bold tracking-tight text-white font-poppins">VARAD</span>
                <span className="text-xl font-light tracking-tight text-teal-400 ml-1">NETRALAYA</span>
                <p className="text-[10px] text-amber-400 font-semibold uppercase">वरद नेत्रालय • सावेडी, अहिल्यानगर</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Varad Netralaya (वरद नेत्रालय, सावेडी, अहिल्यानगर) is a premier eye care & phaco surgery center led by senior ophthalmologists Dr. Smita Prashant Patare and Dr. Raosaheb Kundlik Borude.
            </p>

            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs space-y-1.5">
              <div className="text-rose-400 font-bold flex items-center gap-1.5">
                <FaAmbulance className="animate-pulse" /> Emergency Eye Care: {hospitalInfo.emergencyPhone}
              </div>
              <a 
                href={hospitalInfo.googleMapsLink} 
                target="_blank" 
                rel="noreferrer"
                className="text-amber-300 font-medium hover:underline flex items-center gap-1.5"
              >
                <FaMapMarkerAlt className="text-rose-400" /> Location: बालिकाश्रम रोड, सावेडी, अहिल्यानगर <FaExternalLinkAlt className="text-[10px]" />
              </a>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-2">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-full bg-slate-900 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition shadow-sm">
                <FaFacebookF className="text-sm" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-full bg-slate-900 hover:bg-rose-500 text-slate-300 hover:text-white flex items-center justify-center transition shadow-sm">
                <FaInstagram className="text-sm" />
              </a>
              <a 
                href={hospitalInfo.youtubeChannel} 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Official YouTube Channel @VaradNetrayala" 
                className="w-9 h-9 rounded-full bg-red-600/20 hover:bg-red-600 text-red-500 hover:text-white flex items-center justify-center transition shadow-md border border-red-500/40"
                title="Watch Varad Netralaya YouTube Channel"
              >
                <FaYoutube className="text-base" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-poppins">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              {['Home', 'About', 'Services', 'Eye Treatments', 'Doctors', 'Insurance', 'Gallery', 'Contact'].map((link) => {
                const href = `#${link.toLowerCase().replace(' ', '')}`;
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
              <li className="flex items-center gap-1.5"><span className="text-teal-400">•</span> Pediatric & Squint Evaluation</li>
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
                <span>Mon - Sat: 8:00 AM – 9:00 PM<br /><span className="text-rose-400">Sunday: Closed (Emergency Available)</span></span>
              </p>
              <div className="pt-2">
                <a 
                  href={hospitalInfo.youtubeChannel}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition-all"
                >
                  <FaYoutube className="text-sm" />
                  <span>Subscribe @VaradNetrayala</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 gap-4">
          <p>© {currentYear} Varad Netralaya (वरद नेत्रालय). All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <a href={hospitalInfo.googleMapsLink} target="_blank" rel="noreferrer" className="hover:text-teal-400 transition">Google Maps Savedi</a>
            <span>•</span>
            <a href={hospitalInfo.youtubeChannel} target="_blank" rel="noreferrer" className="hover:text-red-400 transition flex items-center gap-1"><FaYoutube /> YouTube Channel</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
