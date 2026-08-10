import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { doctorsData } from '../data/hospitalData';
import { useTheme } from '../context/ThemeContext';
import { 
  FaUserMd, 
  FaGraduationCap, 
  FaBriefcase, 
  FaClock, 
  FaStar, 
  FaCalendarCheck, 
  FaAward, 
  FaCheckCircle,
  FaTimes,
  FaPhoneAlt
} from 'react-icons/fa';

const Doctors = () => {
  const { openAppointmentModal } = useTheme();
  const [selectedDoctorModal, setSelectedDoctorModal] = useState(null);

  return (
    <section id="doctors" className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-slate-800 text-blue-600 dark:text-teal-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <FaUserMd />
            <span>World-Class Medical Team</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-poppins">
            Meet Our Eye Specialists
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-blue-600 to-teal-400 mx-auto mt-4 rounded-full"></div>
          <p className="text-slate-600 dark:text-slate-300 mt-4 text-base sm:text-lg">
            Fellowship-trained ophthalmic surgeons and sub-specialists dedicated to superior clinical outcomes.
          </p>
        </div>

        {/* Doctors Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {doctorsData.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-soft hover:shadow-2xl transition-all duration-300 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between group"
            >
              <div>
                {/* Doctor Photo & Badges */}
                <div className="relative h-64 overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={doctor.photo}
                    alt={doctor.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                  
                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 text-amber-500 font-bold text-xs shadow-md">
                    <FaStar />
                    <span className="text-slate-800 dark:text-white">{doctor.rating}</span>
                    <span className="text-slate-400 text-[10px]">({doctor.reviewsCount})</span>
                  </div>

                  {/* Doctor Title Badge on image */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] font-semibold text-teal-300 uppercase tracking-wider block">
                      {doctor.title}
                    </span>
                    <h3 className="text-lg font-bold font-poppins">{doctor.name}</h3>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                    <FaGraduationCap className="text-blue-600 dark:text-teal-400 flex-shrink-0 text-sm" />
                    <span className="truncate">{doctor.qualification}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-semibold text-teal-600 dark:text-teal-400">
                    <FaAward className="flex-shrink-0 text-sm" />
                    <span className="truncate">{doctor.specialization}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <FaBriefcase className="flex-shrink-0 text-sm text-slate-400" />
                    <span>{doctor.experience} • {doctor.surgeries}</span>
                  </div>

                  {/* Availability */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-[11px] text-slate-600 dark:text-slate-400">
                    <FaClock className="text-emerald-500 flex-shrink-0" />
                    <span className="truncate">{doctor.available}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 flex gap-2">
                <button
                  onClick={() => setSelectedDoctorModal(doctor)}
                  className="w-1/3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                >
                  Profile
                </button>
                <button
                  onClick={() => openAppointmentModal(doctor.name)}
                  className="w-2/3 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-semibold text-xs shadow-md transition flex items-center justify-center gap-1.5"
                >
                  <FaCalendarCheck /> Book Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Doctor Full Profile Modal */}
        <AnimatePresence>
          {selectedDoctorModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-slate-200 dark:border-slate-800 relative max-h-[90vh] overflow-y-auto"
              >
                <button
                  onClick={() => setSelectedDoctorModal(null)}
                  className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white"
                >
                  <FaTimes />
                </button>

                <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                  <img
                    src={selectedDoctorModal.photo}
                    alt={selectedDoctorModal.name}
                    className="w-32 h-32 rounded-2xl object-cover shadow-lg border-2 border-teal-400"
                  />
                  <div>
                    <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                      {selectedDoctorModal.title}
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-poppins">
                      {selectedDoctorModal.name}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 font-medium">
                      {selectedDoctorModal.qualification}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1 text-amber-500 font-bold">
                        <FaStar /> {selectedDoctorModal.rating} ({selectedDoctorModal.reviewsCount} reviews)
                      </span>
                      <span>•</span>
                      <span>{selectedDoctorModal.experience}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-slate-800/50 border border-blue-100 dark:border-slate-700">
                    <h4 className="text-xs font-bold text-blue-900 dark:text-teal-300 uppercase tracking-wider mb-1">
                      Clinical Expertise & Bio
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {selectedDoctorModal.bio}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                      <span className="text-slate-400 block uppercase text-[10px]">Specialization</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200 mt-0.5 block">{selectedDoctorModal.specialization}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                      <span className="text-slate-400 block uppercase text-[10px]">OPD Timings</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200 mt-0.5 block">{selectedDoctorModal.available}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-end gap-3">
                  <button
                    onClick={() => setSelectedDoctorModal(null)}
                    className="px-5 py-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      const docName = selectedDoctorModal.name;
                      setSelectedDoctorModal(null);
                      openAppointmentModal(docName);
                    }}
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold text-xs shadow-md hover:scale-105 transition-transform flex items-center gap-2"
                  >
                    <FaCalendarCheck /> Book Doctor Appointment
                  </button>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default Doctors;
