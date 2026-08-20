import React from 'react';
import { motion } from 'framer-motion';
import { insurancePartnersData } from '../data/hospitalData';
import { FaShieldAlt, FaCheckCircle, FaPhoneAlt, FaFileInvoiceDollar } from 'react-icons/fa';

const InsurancePartners = () => {
  return (
    <section id="insurance" className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 dark:bg-slate-800 text-purple-600 dark:text-teal-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <FaFileInvoiceDollar />
            <span>Cashless Insurance TPA Network</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-poppins">
            Insurance & TPA Partners
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-blue-600 to-teal-400 mx-auto mt-4 rounded-full"></div>
          <p className="text-slate-600 dark:text-slate-300 mt-4 text-base sm:text-lg">
            Hassle-free 100% cashless hospitalization approvals with leading private and public health insurance companies.
          </p>
        </div>

        {/* Insurance Banner Image */}
        <div className="mb-12 flex justify-center">
          <img src="/photos/documents/insurance-list.jpg" alt="Insurance Partners" className="max-w-full max-h-96 object-contain rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg" />
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {insurancePartnersData.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all text-center flex flex-col items-center justify-between group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-teal-500 text-white flex items-center justify-center text-lg font-bold mb-2 shadow-sm group-hover:scale-110 transition-transform">
                <FaShieldAlt />
              </div>
              <div className="flex-1 flex items-center justify-center">
                <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-teal-400 transition-colors">
                  {partner.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cashless Desk Banner */}
        <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-blue-900 to-teal-900 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl font-bold font-poppins flex items-center justify-center md:justify-start gap-2">
              <FaShieldAlt className="text-teal-400" /> Need Help With Cashless Approval?
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 max-w-xl">
              Our dedicated In-House TPA Desk (Room #104) assists you with fast-track authorization, claim documents, and corporate tie-ups.
            </p>
          </div>
          <a
            href="tel:+919876543210"
            className="px-6 py-3 rounded-full bg-white text-blue-900 font-bold text-xs shadow-lg hover:bg-slate-100 transition flex items-center gap-2 flex-shrink-0"
          >
            <FaPhoneAlt className="text-teal-600" /> TPA Helpline: +91 98765 43210
          </a>
        </div>

      </div>
    </section>
  );
};

export default InsurancePartners;
