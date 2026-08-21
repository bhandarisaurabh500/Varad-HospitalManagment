import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  FaCalendarCheck, FaUserMd, FaNotesMedical, FaCalendarAlt,
  FaClock, FaUser, FaPhoneAlt, FaEnvelope, FaVenusMars,
  FaCheckCircle, FaArrowLeft
} from 'react-icons/fa';

const TIME_SLOTS = [
  '09:00','09:30','10:00','10:30','11:00','11:30',
  '12:00','14:00','14:30','15:00','15:30','16:00','16:30',
];

const Appointment = () => {
  const { user, isAuth } = useAuth();
  const navigate = useNavigate();

  const [doctors,  setDoctors]  = useState([]);
  const [services, setServices] = useState([]);
  const [slots, setSlots]       = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(null);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    doctor_id: '',
    service_id: '',
    appointment_date: '',
    appointment_time: '',
    patient_name: '',
    patient_phone: '',
    symptoms: '',
    age: '',
    gender: '',
  });

  // Load doctors and services
  useEffect(() => {
    api.get('/doctors').then(r => setDoctors(r.data.data)).catch(() => {});
    api.get('/services').then(r => setServices(r.data.data)).catch(() => {});
  }, []);

  // Reload slots when doctor or date changes
  useEffect(() => {
    if (form.doctor_id && form.appointment_date) {
      setLoadingSlots(true);
      setForm(p => ({ ...p, appointment_time: '' }));
      api.get('/appointments/slots', { params: { doctor_id: form.doctor_id, date: form.appointment_date } })
        .then(r => setSlots(r.data.data))
        .catch(() => setSlots(TIME_SLOTS.map(t => ({ time: t, available: true }))))
        .finally(() => setLoadingSlots(false));
    } else {
      setSlots([]);
    }
  }, [form.doctor_id, form.appointment_date]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.appointment_time) return setError('Please select a time slot.');

    setSubmitting(true);
    try {
      const { data } = await api.post('/appointments', form);
      if (data.success) {
        setSubmitted(data.data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  if (submitted) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-10 max-w-lg w-full text-center space-y-5"
        >
          <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 flex items-center justify-center text-4xl mx-auto">
            <FaCheckCircle />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Appointment Booked!</h2>
          <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-5 text-left space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Appointment ID</span>
              <span className="font-bold text-blue-600 dark:text-teal-400 font-mono">{submitted.appointment_no}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Date</span>
              <span className="font-bold text-slate-800 dark:text-white">{form.appointment_date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Time</span>
              <span className="font-bold text-slate-800 dark:text-white">{form.appointment_time}</span>
            </div>
          </div>
          <p className="text-xs text-slate-500">Our team will call you to confirm. Please arrive 15 minutes early.</p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => setSubmitted(null)} className="px-6 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50">Book Another</button>
            <Link to="/patient/appointments" className="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700">View My Appointments</Link>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 dark:from-slate-950 dark:to-slate-900 py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 mb-4">
            <FaArrowLeft /> Back to Home
          </Link>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Book an Appointment</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Schedule your consultation with our expert eye specialists.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 text-rose-600 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 p-8 space-y-6">

          {/* Doctor & Service */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                <FaUserMd className="inline mr-1 text-blue-500" /> Select Doctor *
              </label>
              <select name="doctor_id" required value={form.doctor_id} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">— Any Available Doctor —</option>
                {doctors.map(d => (
                  <option key={d.id} value={d.id}>{d.name} — {d.specialization}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                <FaNotesMedical className="inline mr-1 text-teal-500" /> Service / Treatment
              </label>
              <select name="service_id" value={form.service_id} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">— General Consultation —</option>
                {services.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              <FaCalendarAlt className="inline mr-1 text-blue-500" /> Appointment Date *
            </label>
            <input type="date" name="appointment_date" required min={today}
              value={form.appointment_date} onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Time Slots */}
          {form.doctor_id && form.appointment_date && (
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                <FaClock className="inline mr-1 text-teal-500" /> Select Time Slot *
              </label>
              {loadingSlots ? (
                <p className="text-xs text-slate-400 animate-pulse">Loading available slots…</p>
              ) : (
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {slots.map(slot => (
                    <button
                      key={slot.time} type="button"
                      disabled={!slot.available}
                      onClick={() => setForm(p => ({ ...p, appointment_time: slot.time }))}
                      className={`py-2 px-1 rounded-xl text-xs font-bold transition-all border
                        ${!slot.available
                          ? 'border-slate-200 bg-slate-100 text-slate-300 cursor-not-allowed line-through'
                          : form.appointment_time === slot.time
                            ? 'border-blue-600 bg-blue-600 text-white shadow-md'
                            : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-400 hover:bg-blue-50'
                        }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Patient Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                <FaUser className="inline mr-1 text-blue-500" /> Full Name *
              </label>
              <input type="text" name="patient_name" required placeholder="Patient's Full Name"
                value={form.patient_name} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                <FaPhoneAlt className="inline mr-1 text-teal-500" /> Phone Number *
              </label>
              <input type="tel" name="patient_phone" required placeholder="10-digit mobile number"
                value={form.patient_phone} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Age & Gender */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Age</label>
              <input type="number" name="age" min="1" max="120" placeholder="Age in years"
                value={form.age} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                <FaVenusMars className="inline mr-1 text-purple-500" /> Gender
              </label>
              <select name="gender" value={form.gender} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">— Select —</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
          </div>

          {/* Symptoms */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Symptoms / Reason for Visit</label>
            <textarea name="symptoms" rows="3"
              placeholder="Briefly describe your eye symptoms or reason for consultation…"
              value={form.symptoms} onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button type="submit" disabled={submitting}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 text-white font-bold text-base shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all disabled:opacity-60 flex items-center justify-center gap-2">
            <FaCalendarCheck />
            {submitting ? 'Booking…' : 'Confirm Appointment'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Appointment;
