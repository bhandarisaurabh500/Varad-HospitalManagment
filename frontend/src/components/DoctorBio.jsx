import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FaCalendarCheck, FaStethoscope, FaUserMd } from 'react-icons/fa';
import api from '../services/api';

const DoctorBio = () => {
  const { openAppointmentModal } = useTheme();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await api.get('/doctors');
        if (res.data.success && res.data.data.length > 0) {
          setDoctor(res.data.data[0]);
        }
      } catch (err) {
        console.error('Failed to fetch doctor bio', err);
      }
    };
    fetchDoctor();
  }, []);

  if (!doctor) return null;
  
  return (
    <section id="doctor-bio" className="py-20 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Image */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-3 bg-gradient-to-tr from-blue-100 to-teal-50 dark:from-slate-800 dark:to-slate-700 rounded-3xl transform -rotate-3 z-0"></div>
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950">
                <img 
                  src={doctor.photo} 
                  alt="Dr. Raosaheb K. BORUDE" 
                  className="w-full h-auto object-cover object-top"
                  style={{ maxHeight: '550px' }}
                />
              </div>
            </div>
          </motion.div>

          {/* Right Column: Content */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-bold border border-blue-100 dark:border-blue-800/50">
              <FaUserMd />
              <span>Meet Your Doctor</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white font-poppins">
              {doctor.name}
            </h2>
            
            <h3 className="text-xl md:text-2xl font-bold text-teal-600 dark:text-teal-400">
              {doctor.specialization || 'Eye Specialist'}
            </h3>

            <div className="prose prose-lg dark:prose-invert text-slate-600 dark:text-slate-300">
              {doctor.about ? (
                <p className="leading-relaxed whitespace-pre-line">{doctor.about}</p>
              ) : (
                <>
                  <p className="leading-relaxed">
                    Dr. Raosaheb K. BORUDE is a dedicated Cataract, Glaucoma & Refractive Surgeon providing advanced and comprehensive eye-care services. He focuses on accurate diagnosis, modern treatment techniques and patient-centered care.
                  </p>
                  <p className="leading-relaxed">
                    With a commitment to precision and safety, he provides specialized care for retinal and refractive eye conditions and helps patients achieve better vision and improved quality of life.
                  </p>
                </>
              )}
            </div>

            <div className="pt-6 flex flex-wrap items-center gap-4">
              <button
                onClick={() => openAppointmentModal(doctor.name)}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 via-teal-500 to-emerald-500 hover:from-blue-700 hover:to-teal-600 text-white font-bold text-base shadow-lg shadow-blue-500/25 hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
              >
                <FaCalendarCheck className="text-lg" />
                <span>Book Appointment</span>
              </button>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default DoctorBio;
