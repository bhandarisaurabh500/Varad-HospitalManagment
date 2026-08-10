import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { aboutData } from '../data/hospitalData';
import { FaHospital, FaHistory, FaBullseye, FaEye, FaAward, FaCheckCircle, FaRibbon } from 'react-icons/fa';

const About = () => {
  const [activeTab, setActiveTab] = useState('mission');

  const tabs = [
    { id: 'mission', label: 'Our Mission', icon: FaBullseye, content: aboutData.mission },
    { id: 'vision', label: 'Our Vision', icon: FaEye, content: aboutData.vision },
    { id: 'quality', label: 'Quality Policy', icon: FaAward, content: aboutData.qualityPolicy },
  ];

  return (
    <section id="about" className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-teal-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <FaHospital />
            <span>Pioneering Eye Care Since 2011</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-poppins">
            About Varad Hospital
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-blue-600 to-teal-400 mx-auto mt-4 rounded-full"></div>
          <p className="text-slate-600 dark:text-slate-300 mt-4 text-base sm:text-lg">
            {aboutData.subtitle}
          </p>
        </div>

        {/* Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Image Collage & Badges */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-100 dark:border-slate-800">
              <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800"
                alt="Varad Hospital Facility"
                className="w-full h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="flex items-center gap-2 text-xs font-semibold text-teal-300 uppercase tracking-wider mb-1">
                  <FaRibbon /> NABH & ISO 9001:2015 Certified
                </div>
                <h3 className="text-xl font-bold font-poppins">International Standard OT & Clinics</h3>
              </div>
            </div>

            {/* Overlapping Floating Badge */}
            <div className="absolute -bottom-6 -right-6 hidden sm:flex items-center gap-4 bg-gradient-to-br from-blue-600 to-teal-500 text-white p-5 rounded-2xl shadow-xl max-w-xs">
              <div className="text-3xl font-extrabold font-poppins">15+</div>
              <div className="text-xs font-medium leading-tight">
                Years of Clinical Excellence & Surgical Mastery
              </div>
            </div>
          </motion.div>

          {/* Right Column: Narrative & Interactive Tabs */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-poppins mb-3">
                World-Class Ophthalmic Excellence
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                {aboutData.description}
              </p>
            </div>

            {/* Hospital History Block */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
              <div className="flex items-center gap-2 text-blue-600 dark:text-teal-400 font-bold text-sm mb-2">
                <FaHistory />
                <span>Our History & Growth</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                {aboutData.history}
              </p>
            </div>

            {/* Interactive Tabs for Mission, Vision, Quality */}
            <div className="pt-2">
              <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      <Icon />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab Panel Content */}
              <div className="mt-4 p-5 rounded-2xl bg-blue-50/50 dark:bg-slate-800/40 border border-blue-100 dark:border-slate-700/50">
                {tabs.map((tab) => {
                  if (tab.id !== activeTab) return null;
                  return (
                    <motion.div
                      key={tab.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-2"
                    >
                      <h4 className="text-sm font-bold text-blue-900 dark:text-teal-300 flex items-center gap-2">
                        <FaCheckCircle className="text-teal-500" />
                        <span>{tab.label}</span>
                      </h4>
                      <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                        {tab.content}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
