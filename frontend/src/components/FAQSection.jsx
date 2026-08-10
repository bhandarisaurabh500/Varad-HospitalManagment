import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqList } from '../data/hospitalData';
import { FaQuestionCircle, FaChevronDown, FaChevronUp, FaHeadset } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const { openAppointmentModal } = useTheme();

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300 relative overflow-hidden">
      {/* Decorative background light */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-slate-800 text-blue-600 dark:text-teal-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <FaQuestionCircle />
            <span>Got Questions? We Have Answers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-poppins">
            Frequently Asked Questions (FAQ)
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-blue-600 to-teal-400 mx-auto mt-4 rounded-full"></div>
          <p className="text-slate-600 dark:text-slate-300 mt-4 text-base sm:text-lg">
            Common questions about Varad Netralaya eye care services, doctor consultations, cataract surgeries, and cashless insurance.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqList.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/80 overflow-hidden shadow-sm hover:shadow-md transition-all"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-poppins pr-4">
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-transform duration-300 ${
                    isOpen 
                      ? 'bg-blue-600 text-white rotate-180' 
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}>
                    <FaChevronDown />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pt-2 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed border-t border-slate-200/60 dark:border-slate-800/60 mt-1">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* FAQ Help Banner */}
        <div className="mt-12 max-w-4xl mx-auto p-6 rounded-3xl bg-gradient-to-r from-blue-900 via-slate-900 to-teal-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-blue-800/40">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-300 flex items-center justify-center text-2xl flex-shrink-0">
              <FaHeadset />
            </div>
            <div>
              <h4 className="text-lg font-bold font-poppins">Still Have Questions?</h4>
              <p className="text-xs text-slate-300">Call our eye clinic reception or book an online consultation directly.</p>
            </div>
          </div>

          <button
            onClick={openAppointmentModal}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-teal-500 hover:to-emerald-600 text-slate-950 font-bold text-sm shadow-md hover:scale-105 transition-all flex-shrink-0"
          >
            Ask Eye Specialist
          </button>
        </div>

      </div>
    </section>
  );
};

export default FAQSection;
