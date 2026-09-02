import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'react-icons/fa';
import api from '../services/api';
import { useTheme } from '../context/ThemeContext';
import { 
  FaEye, 
  FaMicroscope, 
  FaBriefcaseMedical, 
  FaSearchPlus, 
  FaNotesMedical, 
  FaGlasses, 
  FaChild, 
  FaDotCircle, 
  FaBaby, 
  FaCheckCircle,
  FaSearch,
  FaCalendarCheck,
  FaTimes,
  FaInfoCircle
} from 'react-icons/fa';

const Services = () => {
  const { openAppointmentModal } = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [servicesData, setServicesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeModalService, setActiveModalService] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get('/services');
        if (res.data.success) {
          setServicesData(res.data.data);
          if (res.data.data.length > 0) {
            setActiveTab(res.data.data[0].id);
          }
        }
      } catch (err) {
        console.error('Failed to fetch services:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const activeService = servicesData.find(s => s.id === activeTab) || servicesData[0];

  const DynamicIcon = ({ iconName, className }) => {
    const IconComponent = Icons[iconName] || Icons.FaBriefcaseMedical;
    return <IconComponent className={className} />;
  };

  if (loading) return null;
  if (!servicesData || servicesData.length === 0) return null;

  return (
    <section id="services" className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-slate-800 text-blue-600 dark:text-teal-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <FaEye />
            <span>Comprehensive Ophthalmic Specialties</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-poppins">
            Our Eye Care Services
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-blue-600 to-teal-400 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => {
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (index % 3) * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-white dark:bg-slate-900 rounded-3xl p-7 shadow-soft hover:shadow-2xl transition-all duration-300 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-teal-400 flex items-center justify-center text-2xl group-hover:bg-gradient-to-tr group-hover:from-blue-600 group-hover:to-teal-400 group-hover:text-white transition-all duration-300 shadow-sm">
                      <DynamicIcon iconName={service.icon} />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white font-poppins group-hover:text-blue-600 dark:group-hover:text-teal-400 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
                    {service.short_desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setActiveModalService(service)}
                    className="text-xs font-semibold text-blue-600 dark:text-teal-400 flex items-center gap-1 hover:underline"
                  >
                    <FaInfoCircle /> Details
                  </button>
                  <button
                    onClick={() => openAppointmentModal(null, service.name)}
                    className="px-4 py-2 rounded-full bg-blue-50 dark:bg-slate-800 hover:bg-blue-600 hover:text-white dark:hover:bg-teal-500 text-blue-600 dark:text-teal-400 font-semibold text-xs transition-colors flex items-center gap-1.5"
                  >
                    <FaCalendarCheck /> Book Care
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Modal for Service Details */}
        <AnimatePresence>
          {activeModalService && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 dark:border-slate-800 relative"
              >
                <button
                  onClick={() => setActiveModalService(null)}
                  className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white"
                >
                  <FaTimes />
                </button>

                <div className="w-16 h-16 bg-gradient-to-br from-teal-50 to-blue-50 dark:from-teal-900/30 dark:to-blue-900/30 rounded-2xl flex items-center justify-center shadow-inner mb-4">
                  <DynamicIcon iconName={activeModalService.icon} className="text-3xl text-teal-600 dark:text-teal-400" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-2">
                    {activeModalService.name}
                  </h3>
                  <p className="text-teal-600 dark:text-teal-400 font-medium">
                    {activeModalService.short_desc}
                  </p>
                </div>
                
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                  {activeModalService.description}
                </p>

                <div className="mt-8 flex items-center justify-end gap-3">
                  <button
                    onClick={() => setActiveModalService(null)}
                    className="px-5 py-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      const serviceTitle = activeModalService.name;
                      setActiveModalService(null);
                      openAppointmentModal(null, serviceTitle);
                    }}
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold text-xs shadow-md hover:scale-105 transition-transform flex items-center gap-2"
                  >
                    <FaCalendarCheck /> Book Appointment
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

export default Services;
