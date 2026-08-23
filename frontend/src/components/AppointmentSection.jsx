import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { doctorsData, servicesData, hospitalInfo } from '../data/hospitalData';
import { useTheme } from '../context/ThemeContext';
import api from '../services/api';
import { 
  FaCalendarCheck, 
  FaUser, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaUserMd, 
  FaNotesMedical, 
  FaCalendarAlt, 
  FaClock, 
  FaCheckCircle, 
  FaTimes,
  FaShieldAlt
} from 'react-icons/fa';

export const AppointmentForm = ({ preselectedDoctor = null, preselectedTreatment = null, onSuccess = null }) => {
  const { showToast } = useTheme();
  
  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    email: '',
    age: '',
    gender: 'Male',
    doctor: preselectedDoctor || '',
    treatment: preselectedTreatment || '',
    preferredDate: '',
    preferredTime: 'Morning (9:00 AM - 12:00 PM)',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (preselectedDoctor) {
      setFormData(prev => ({ ...prev, doctor: preselectedDoctor }));
    }
    if (preselectedTreatment) {
      setFormData(prev => ({ ...prev, treatment: preselectedTreatment }));
    }
  }, [preselectedDoctor, preselectedTreatment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (apiError) setApiError('');
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.patientName.trim()) newErrors.patientName = 'Patient name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9+\-\s]{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    if (!formData.preferredDate) newErrors.preferredDate = 'Please select a preferred date';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setApiError('');
    
    try {
      let appointmentTime = '10:00:00';
      if (formData.preferredTime.includes('Afternoon')) appointmentTime = '14:00:00';
      if (formData.preferredTime.includes('Evening')) appointmentTime = '18:00:00';

      const payload = {
        doctor_id: 1, // Defaulting to Dr. Ravsaheb Borude
        appointment_date: formData.preferredDate,
        appointment_time: appointmentTime,
        patient_name: formData.patientName,
        patient_email: formData.email || `${formData.phone}@noemail.com`,
        patient_phone: formData.phone,
        age: formData.age ? parseInt(formData.age, 10) : null,
        gender: formData.gender,
        symptoms: formData.message || formData.treatment || 'Comprehensive Checkup',
      };

      await api.post('/appointments', payload);

      setSubmitted(true);
      showToast(`Appointment Request Received for ${formData.patientName}!`);
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 3000);
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      const errorMsg = error.response?.data?.message || 'Failed to book appointment. Please try again.';
      setApiError(errorMsg);
      showToast(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-8 px-4 space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mx-auto animate-bounce">
          <FaCheckCircle />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-poppins">
          Appointment Booked Successfully!
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
          Thank you, <span className="font-bold text-blue-600 dark:text-teal-400">{formData.patientName}</span>. Our Varad Desk representative will call you shortly at <span className="font-semibold">{formData.phone}</span> to confirm your appointment token.
        </p>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-left text-xs space-y-2 max-w-md mx-auto">
          <div className="flex justify-between">
            <span className="text-slate-400">Doctor:</span>
            <span className="font-bold text-slate-800 dark:text-white">{formData.doctor || 'Any Senior Specialist'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Treatment:</span>
            <span className="font-bold text-slate-800 dark:text-white">{formData.treatment || 'Comprehensive Checkup'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Requested Date & Time:</span>
            <span className="font-bold text-teal-600 dark:text-teal-400">{formData.preferredDate} ({formData.preferredTime.split(' ')[0]})</span>
          </div>
        </div>

        <button
          onClick={() => { setSubmitted(false); }}
          className="mt-4 px-6 py-2.5 rounded-full bg-blue-600 text-white font-semibold text-xs shadow-md"
        >
          Book Another Appointment
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Patient Name */}
      <div>
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
          Patient Full Name *
        </label>
        <div className="relative">
          <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            placeholder="e.g. Rajesh Kumar"
            className={`w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border ${
              errors.patientName ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
            } text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>
        {errors.patientName && <p className="text-[11px] text-rose-500 mt-1">{errors.patientName}</p>}
      </div>

      {/* Phone & Email Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Phone Number *
          </label>
          <div className="relative">
            <FaPhoneAlt className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="10-digit Mobile Number"
              className={`w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border ${
                errors.phone ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
              } text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          {errors.phone && <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Email Address (Optional)
          </label>
          <div className="relative">
            <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@domain.com"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Age & Gender Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Age
          </label>
          <input
            type="number"
            name="age"
            min="1"
            max="120"
            value={formData.age}
            onChange={handleChange}
            placeholder="e.g. 45"
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Gender
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Doctor & Treatment Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Select Doctor
          </label>
          <div className="relative">
            <FaUserMd className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <select
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Any Available Senior Specialist</option>
              {doctorsData.map(doc => (
                <option key={doc.id} value={doc.name}>
                  {doc.name} ({doc.title.split(' ')[0]})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Treatment / Department
          </label>
          <div className="relative">
            <FaNotesMedical className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <select
              name="treatment"
              value={formData.treatment}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Comprehensive Eye Checkup</option>
              {servicesData.map(service => (
                <option key={service.id} value={service.title}>
                  {service.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Date & Time Slot Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Preferred Date *
          </label>
          <div className="relative">
            <FaCalendarAlt className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <input
              type="date"
              name="preferredDate"
              min={new Date().toISOString().split('T')[0]}
              value={formData.preferredDate}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border ${
                errors.preferredDate ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
              } text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          {errors.preferredDate && <p className="text-[11px] text-rose-500 mt-1">{errors.preferredDate}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Preferred Time Slot
          </label>
          <div className="relative">
            <FaClock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <select
              name="preferredTime"
              value={formData.preferredTime}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Morning (9:00 AM - 12:00 PM)">Morning (9:00 AM - 12:00 PM)</option>
              <option value="Afternoon (2:00 PM - 5:00 PM)">Afternoon (2:00 PM - 5:00 PM)</option>
              <option value="Evening (5:00 PM - 8:00 PM)">Evening (5:00 PM - 8:00 PM)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
          Eye Symptoms / Additional Message
        </label>
        <textarea
          name="message"
          rows="3"
          value={formData.message}
          onChange={handleChange}
          placeholder="Briefly describe your vision issue or requirement..."
          className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      {/* API Error Display */}
      {apiError && (
        <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 text-rose-600 text-xs font-semibold text-center">
          {apiError}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-4 rounded-xl ${isSubmitting ? 'bg-slate-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 hover:scale-[1.01]'} text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-transform flex items-center justify-center gap-2`}
      >
        <FaCalendarCheck />
        <span>{isSubmitting ? 'Booking...' : 'Confirm Appointment Request'}</span>
      </button>

      <p className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1 mt-2">
        <FaShieldAlt className="text-teal-500" /> Free Cancellation • Zero Booking Fees
      </p>
    </form>
  );
};

export const AppointmentModal = () => {
  const { appointmentModalOpen, closeAppointmentModal, selectedDoctor, selectedTreatment } = useTheme();

  return (
    <AnimatePresence>
      {appointmentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl border border-slate-200 dark:border-slate-800 relative max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={closeAppointmentModal}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white"
            >
              <FaTimes />
            </button>

            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-slate-800 text-blue-600 dark:text-teal-400 text-[11px] font-bold uppercase tracking-wider mb-2">
                <FaCalendarCheck /> Online Booking Desk
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-poppins">
                Book An Appointment
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Schedule your consultation with Varad Eye Specialists.
              </p>
            </div>

            <AppointmentForm
              preselectedDoctor={selectedDoctor}
              preselectedTreatment={selectedTreatment}
              onSuccess={closeAppointmentModal}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const AppointmentSection = () => {
  return (
    <section id="appointment" className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Narrative */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-slate-800 text-blue-600 dark:text-teal-400 text-xs font-semibold uppercase tracking-wider">
              <FaCalendarCheck />
              <span>Easy 1-Minute Booking</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-poppins leading-tight">
              Schedule Your Vision Checkup Today
            </h2>

            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
              Don't wait when it comes to your sight. Book a comprehensive 12-step eye evaluation with our senior surgeons.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex flex-col gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                
                <div>
                  <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Appointment Mobile</h4>
                  <a href={`tel:${hospitalInfo.appointmentPhone}`} className="text-xl font-bold text-blue-600 dark:text-teal-400 hover:underline flex items-center gap-2 mt-1">
                    <FaPhoneAlt className="text-sm" /> {hospitalInfo.appointmentPhone}
                  </a>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                  <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Clinic</h4>
                  <a href={`tel:${hospitalInfo.clinicPhone}`} className="text-lg font-bold text-slate-800 dark:text-slate-200 hover:underline flex items-center gap-2 mt-1">
                    <FaPhoneAlt className="text-sm" /> {hospitalInfo.clinicPhone}
                  </a>
                </div>

                <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a href={`tel:${hospitalInfo.appointmentPhone}`} className="w-full flex items-center justify-center gap-2 bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 dark:hover:bg-slate-600 text-white font-bold text-sm px-4 py-3 rounded-xl transition shadow">
                    <FaPhoneAlt /> Call for Appointment
                  </a>
                  <a href="#appointment-form" onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('appointment-form')?.scrollIntoView({ behavior: 'smooth' });
                  }} className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-4 py-3 rounded-xl transition shadow">
                    <FaCalendarCheck /> Book Online
                  </a>
                </div>

              </div>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-950 p-6 sm:p-10 rounded-3xl shadow-xl border border-slate-200/80 dark:border-slate-800">
            <AppointmentForm />
          </div>

        </div>
      </div>
    </section>
  );
};

export default AppointmentSection;
