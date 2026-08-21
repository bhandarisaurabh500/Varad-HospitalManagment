import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { patientHealthcareData } from '../data/hospitalData';
import { FaHeartbeat, FaArrowRight } from 'react-icons/fa';
import * as Icons from 'react-icons/fa';

const PatientHealthcareHighlight = () => {
  const highlightItems = patientHealthcareData.slice(0, 3); // Care, Before, After

  return (
    <section className="py-20 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 text-sm font-bold mb-4">
            <FaHeartbeat />
            <span>Patient First</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white font-poppins">
            Patient <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">Healthcare</span>
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 text-lg">
            Essential guidelines for a smooth recovery and better eye health.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {highlightItems.map((section, index) => {
            const IconComponent = Icons[section.icon] || Icons.FaBriefcaseMedical;
            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-700 flex items-center justify-center text-xl text-teal-500 shadow-sm mb-4">
                  <IconComponent />
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white font-poppins mb-3">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.points.slice(0, 2).map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <Icons.FaCheckCircle className="text-teal-500 mt-1 flex-shrink-0" />
                      <span className="line-clamp-2">{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center">
          <Link 
            to="/patient-healthcare"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-slate-900 dark:bg-slate-800 text-white font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all group"
          >
            <span>Read All Guidelines</span>
            <FaArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default PatientHealthcareHighlight;
