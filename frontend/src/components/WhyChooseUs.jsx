import React from 'react';
import { motion } from 'framer-motion';
import { whyChooseUsData } from '../data/hospitalData';
import { 
  FaUserCheck, 
  FaLaptopMedical, 
  FaClock, 
  FaShieldAlt, 
  FaHandHoldingUsd, 
  FaSmile, 
  FaHospital 
} from 'react-icons/fa';

const iconMap = {
  FaUserCheck: FaUserCheck,
  FaLaptopMedical: FaLaptopMedical,
  FaClock: FaClock,
  FaShieldAlt: FaShieldAlt,
  FaHandHoldingUsd: FaHandHoldingUsd,
  FaSmile: FaSmile,
  FaHospital: FaHospital
};

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-slate-800 text-emerald-700 dark:text-teal-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <FaShieldAlt />
            <span>Why Varad Hospital</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-poppins">
            Why Patients Choose Us
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-blue-600 to-teal-400 mx-auto mt-4 rounded-full"></div>
          <p className="text-slate-600 dark:text-slate-300 mt-4 text-base sm:text-lg">
            We blend surgical precision, cutting-edge German technology, and compassionate patient care for unmatched visual outcomes.
          </p>
        </div>

        {/* Animated Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {whyChooseUsData.map((item, index) => {
            const IconComponent = iconMap[item.icon] || FaShieldAlt;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800 shadow-soft hover:shadow-xl transition-all duration-300 group"
              >
                <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                  <IconComponent />
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-poppins group-hover:text-blue-600 dark:group-hover:text-teal-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
