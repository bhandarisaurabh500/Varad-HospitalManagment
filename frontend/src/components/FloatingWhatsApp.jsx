import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaTimes, FaPaperPlane, FaUserMd, FaCalendarCheck } from 'react-icons/fa';
import { hospitalInfo } from '../data/hospitalData';
import { useTheme } from '../context/ThemeContext';

const FloatingWhatsApp = () => {
  const { openAppointmentModal } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [userMsg, setUserMsg] = useState('');

  const phoneFormatted = '919876543210';

  const handleSendWhatsApp = (customText = null) => {
    const textToSend = customText || userMsg || "Hello Dr. Borude's Clinic, I would like to inquire about an appointment.";
    const encoded = encodeURIComponent(textToSend);
    window.open(`https://wa.me/${phoneFormatted}?text=${encoded}`, '_blank');
    setIsOpen(false);
    setUserMsg('');
  };

  return (
    <div className="fixed bottom-6 left-6 z-40">
      
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Contact on WhatsApp"
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center text-3xl shadow-2xl relative group"
      >
        <span className="absolute -inset-1 rounded-full bg-emerald-500/50 animate-ping pointer-events-none"></span>
        <FaWhatsapp />
      </motion.button>

      {/* WhatsApp Popup Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-16 left-0 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
          >
            {/* WhatsApp Header */}
            <div className="bg-emerald-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl">
                  <FaUserMd />
                </div>
                <div>
                  <h4 className="text-sm font-bold font-poppins">Dr. Borude's Clinic</h4>
                  <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
                    Online • Typical reply in 5 mins
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-emerald-700 text-white"
              >
                <FaTimes />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-4 bg-slate-50 dark:bg-slate-950 space-y-3 max-h-72 overflow-y-auto">
              <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-sm text-xs text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 max-w-[85%]">
                👋 Hello! Welcome to Dr. Raosaheb Kundlik Borude's Clinic. How can we assist your vision today?
              </div>

              <div className="space-y-1.5 pt-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Quick Actions:</p>
                <button
                  onClick={() => { setIsOpen(false); openAppointmentModal(); }}
                  className="w-full text-left p-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-blue-600 dark:text-teal-400 flex items-center gap-2"
                >
                  <FaCalendarCheck /> Book Doctor Appointment
                </button>
                <button
                  onClick={() => handleSendWhatsApp('Hello, I need information about MJPJAY & Ayushman Bharat Cashless Scheme.')}
                  className="w-full text-left p-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  🏥 Inquire About Cashless Govt Schemes
                </button>
                <button
                  onClick={() => handleSendWhatsApp('Hello, I want details regarding LASIK / Cataract Surgery packages.')}
                  className="w-full text-left p-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  👁️ Surgery Packages & Cost Estimate
                </button>
              </div>
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
              <input
                type="text"
                value={userMsg}
                onChange={(e) => setUserMsg(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendWhatsApp()}
                placeholder="Type a WhatsApp message..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-800 dark:text-white focus:outline-none"
              />
              <button
                onClick={() => handleSendWhatsApp()}
                className="p-2.5 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 transition"
              >
                <FaPaperPlane className="text-xs" />
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default FloatingWhatsApp;
