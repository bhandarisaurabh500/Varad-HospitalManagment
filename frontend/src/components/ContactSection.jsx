import React from 'react';
import { motion } from 'framer-motion';
import { hospitalInfo } from '../data/hospitalData';
import { 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaClock, 
  FaDirections, 
  FaExternalLinkAlt,
  FaShieldAlt,
  FaEye 
} from 'react-icons/fa';

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-slate-800 text-blue-600 dark:text-teal-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <FaMapMarkerAlt />
            <span>Balikashram Road, Savedi, Ahilyanagar</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-poppins">
            Varad Netralaya Location & Contact
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-blue-600 to-teal-400 mx-auto mt-4 rounded-full"></div>
          <p className="text-slate-600 dark:text-slate-300 mt-4 text-base sm:text-lg">
            {hospitalInfo.marathiName} • Near Anita Medical, Behind Hotel Parichay, Balikashram Road, Savedi, Ahilyanagar.
          </p>

          <div className="mt-6">
            <a
              href={hospitalInfo.googleMapsLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-bold text-sm shadow-lg shadow-blue-500/25 hover:scale-105 transition-transform"
            >
              <FaMapMarkerAlt className="text-base text-rose-300 animate-bounce" />
              <span>Open Google Maps Location (Balikashram Road, Savedi)</span>
              <FaExternalLinkAlt className="text-xs ml-1" />
            </a>
          </div>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          {/* Card 1: Address */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft hover:shadow-xl transition-all">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-teal-400 flex items-center justify-center text-xl mb-4">
              <FaMapMarkerAlt />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-poppins">
              Clinic Location
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed font-medium">
              {hospitalInfo.address}
            </p>
            <p className="text-xs text-teal-600 dark:text-teal-400 mt-1 font-semibold">
              Plus Code: {hospitalInfo.plusCode}
            </p>
          </div>

          {/* Card 2: Phone */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft hover:shadow-xl transition-all">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-slate-800 text-teal-600 dark:text-teal-400 flex items-center justify-center text-xl mb-4">
              <FaPhoneAlt />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-poppins">
              Appointment Helpline
            </h3>
            <div className="mt-2 space-y-1 text-xs">
              <p className="text-slate-700 dark:text-slate-300">Clinic OPD: <a href={`tel:${hospitalInfo.phone}`} className="font-bold text-blue-600 dark:text-teal-400 hover:underline">{hospitalInfo.phone}</a></p>
              <p className="text-rose-600 dark:text-rose-400 font-bold">Emergency Care: <a href={`tel:${hospitalInfo.emergencyPhone}`} className="hover:underline">{hospitalInfo.emergencyPhone}</a></p>
              <p className="text-slate-500">Toll-Free: {hospitalInfo.tollFree}</p>
            </div>
          </div>

          {/* Card 3: Email */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft hover:shadow-xl transition-all">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-slate-800 text-purple-600 dark:text-teal-400 flex items-center justify-center text-xl mb-4">
              <FaEnvelope />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-poppins">
              Email Contacts
            </h3>
            <div className="mt-2 space-y-1 text-xs">
              <p className="text-slate-700 dark:text-slate-300">Inquiries: <a href={`mailto:${hospitalInfo.email}`} className="text-blue-600 dark:text-teal-400 hover:underline">{hospitalInfo.email}</a></p>
              <p className="text-slate-700 dark:text-slate-300">Appointments: <a href={`mailto:${hospitalInfo.appointmentEmail}`} className="text-blue-600 dark:text-teal-400 hover:underline">{hospitalInfo.appointmentEmail}</a></p>
            </div>
          </div>

          {/* Card 4: Working Hours */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft hover:shadow-xl transition-all">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-slate-800 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xl mb-4">
              <FaClock />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-poppins">
              Clinic Timings
            </h3>
            <div className="mt-2 space-y-1 text-xs text-slate-600 dark:text-slate-400">
              <p><span className="font-semibold text-slate-800 dark:text-slate-200">Mon - Sat:</span> 8:00 AM – 9:00 PM</p>
              <p><span className="font-semibold text-rose-600 dark:text-rose-400">Sunday:</span> Closed (Emergency Available)</p>
            </div>
          </div>

        </div>

        {/* Embedded Google Map Section */}
        <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 relative bg-slate-200 dark:bg-slate-800 h-96">
          <iframe
            title="Varad Netralaya Savedi Ahilyanagar Map"
            className="w-full h-full border-0 filter dark:contrast-125 dark:opacity-90"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.187311145102!2d74.7258!3d19.1122!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdcb06000000001%3A0x123456789abcdef!2sSavedi%2C%20Ahilyanagar!5e0!3m2!1sen!2sin!4v1650000000000!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>

          {/* Floating Map Label Badge */}
          <div className="absolute bottom-6 left-6 hidden sm:flex items-center gap-3 p-4 rounded-2xl glass-panel text-slate-900 dark:text-white shadow-xl max-w-sm">
            <FaDirections className="text-2xl text-blue-600 dark:text-teal-400 flex-shrink-0" />
            <div>
              <h4 className="text-xs font-bold font-poppins">Varad Netralaya (वरद नेत्रालय)</h4>
              <p className="text-[11px] text-slate-600 dark:text-slate-300">Near Anita Medical, Behind Hotel Parichay, Balikashram Road, Savedi, Ahilyanagar</p>
              <a href={hospitalInfo.googleMapsLink} target="_blank" rel="noreferrer" className="text-[10px] text-blue-600 dark:text-teal-400 font-bold hover:underline">Click for Directions →</a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;
