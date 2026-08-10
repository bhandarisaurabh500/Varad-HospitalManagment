import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { eyeTreatmentsData } from '../data/hospitalData';
import { useTheme } from '../context/ThemeContext';
import { 
  FaSyringe, 
  FaClock, 
  FaHourglassHalf, 
  FaCheckCircle, 
  FaCalendarCheck, 
  FaLaptopMedical, 
  FaShieldAlt,
  FaFilePrescription
} from 'react-icons/fa';

const EyeTreatments = () => {
  const { openAppointmentModal } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Glaucoma Surgery', 'Laser Treatment', 'Refractive Surgery', 'Vitreoretinal Surgery'];

  const filteredTreatments = selectedCategory === 'All'
    ? eyeTreatmentsData
    : eyeTreatmentsData.filter(t => t.category === selectedCategory || (selectedCategory === 'Glaucoma Surgery' && t.category.includes('Glaucoma')));

  return (
    <section id="treatments" className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100 dark:bg-slate-800 text-teal-700 dark:text-teal-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <FaLaptopMedical />
            <span>Surgical & Laser Innovations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-poppins">
            Advanced Eye Treatments
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-blue-600 to-teal-400 mx-auto mt-4 rounded-full"></div>
          <p className="text-slate-600 dark:text-slate-300 mt-4 text-base sm:text-lg">
            High-precision microsurgical procedures and non-invasive laser treatments for long-lasting visual clarity.
          </p>

          {/* Filter Pill Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Treatment Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTreatments.map((treatment, index) => (
            <motion.div
              key={treatment.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (index % 4) * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-slate-50 dark:bg-slate-950/80 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between shadow-soft hover:shadow-xl transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-blue-100 dark:bg-slate-800 text-blue-700 dark:text-teal-400">
                    {treatment.category}
                  </span>
                  <FaShieldAlt className="text-teal-500 text-sm" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-poppins group-hover:text-blue-600 dark:group-hover:text-teal-400 transition-colors">
                  {treatment.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  {treatment.desc}
                </p>

                {/* Treatment Parameters */}
                <div className="mt-4 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 grid grid-cols-3 gap-1 text-center">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block">Duration</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1 mt-0.5">
                      <FaClock className="text-blue-500 text-[10px]" /> {treatment.duration}
                    </span>
                  </div>
                  <div className="border-x border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase block">Recovery</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1 mt-0.5">
                      <FaHourglassHalf className="text-teal-500 text-[10px]" /> {treatment.recovery}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block">Anesthesia</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1 mt-0.5 truncate px-1">
                      <FaSyringe className="text-rose-400 text-[10px]" /> {treatment.anesthesia.split(' ')[0]}
                    </span>
                  </div>
                </div>

                {/* Key Benefits List */}
                <div className="mt-4 space-y-1.5">
                  {treatment.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <FaCheckCircle className="text-teal-500 text-[11px] flex-shrink-0" />
                      <span className="truncate">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800">
                <button
                  onClick={() => openAppointmentModal(null, treatment.title)}
                  className="w-full py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <FaCalendarCheck />
                  <span>Book Consultation</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default EyeTreatments;
