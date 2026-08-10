import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { govtSchemesData } from '../data/hospitalData';
import { useTheme } from '../context/ThemeContext';
import { 
  FaShieldAlt, 
  FaCheckCircle, 
  FaFileAlt, 
  FaRupeeSign, 
  FaPhoneAlt, 
  FaBuilding,
  FaInfoCircle,
  FaCalendarCheck
} from 'react-icons/fa';

const GovtSchemes = () => {
  const { openAppointmentModal } = useTheme();
  const [activeTab, setActiveTab] = useState('mjpjay');

  return (
    <section id="schemes" className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-slate-800 text-blue-600 dark:text-teal-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <FaShieldAlt />
            <span>Government Health Empaneled</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-poppins">
            Government Cashless Schemes
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-blue-600 to-teal-400 mx-auto mt-4 rounded-full"></div>
          <p className="text-slate-600 dark:text-slate-300 mt-4 text-base sm:text-lg">
            We provide 100% cashless eye surgeries and treatments under state and central health schemes.
          </p>
        </div>

        {/* Scheme Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {govtSchemesData.map((scheme) => (
            <button
              key={scheme.id}
              onClick={() => setActiveTab(scheme.id)}
              className={`px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                activeTab === scheme.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-105'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <FaBuilding className="text-teal-400" />
              <span>{scheme.name.split(' (')[0]}</span>
            </button>
          ))}
        </div>

        {/* Active Scheme Detailed Card */}
        {govtSchemesData.map((scheme) => {
          if (scheme.id !== activeTab) return null;
          return (
            <motion.div
              key={scheme.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/80 dark:border-slate-800"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left Overview */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-xs">
                      {scheme.badge}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {scheme.state}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-poppins">
                    {scheme.name}
                  </h3>

                  <div className="p-4 rounded-2xl bg-blue-50 dark:bg-slate-800/60 border border-blue-100 dark:border-slate-700 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xl font-bold flex-shrink-0">
                      <FaRupeeSign />
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase block">Maximum Financial Cover</span>
                      <span className="text-lg font-extrabold text-blue-900 dark:text-teal-300">{scheme.coverage}</span>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {scheme.desc}
                  </p>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => openAppointmentModal(null, `${scheme.name.split(' (')[0]} Scheme Inquiry`)}
                      className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold text-xs shadow-md hover:scale-105 transition flex items-center justify-center gap-2"
                    >
                      <FaCalendarCheck /> Book Scheme Consultation
                    </button>
                    <a
                      href="tel:+919876543210"
                      className="px-6 py-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white font-semibold text-xs border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                    >
                      <FaPhoneAlt className="text-teal-500" /> Scheme Desk: +91 98765 43210
                    </a>
                  </div>
                </div>

                {/* Right Lists: Covered Surgeries & Required Documents */}
                <div className="lg:col-span-6 space-y-6">
                  
                  {/* Covered Surgeries */}
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                      <FaCheckCircle className="text-teal-500" />
                      <span>Covered Eye Surgeries & Procedures</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {scheme.coveredSurgeries.map((surgery, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                          <span>{surgery}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Required Documents */}
                  <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/30">
                    <h4 className="text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <FaFileAlt className="text-amber-500" />
                      <span>Mandatory Documents Required</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {scheme.documents.map((doc, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-amber-100 dark:border-slate-800">
                          <span className="text-amber-500 font-bold">•</span>
                          <span>{doc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            </motion.div>
          );
        })}

      </div>
    </section>
  );
};

export default GovtSchemes;
