import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import api from '../../services/api';
import { FaUser, FaPhoneAlt, FaEnvelope, FaCalendarAlt, FaStethoscope, FaHistory, FaPrescriptionBottleAlt, FaArrowLeft, FaPrint, FaTimes, FaPlus, FaEye } from 'react-icons/fa';

const PatientProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'overview';
  
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(initialTab);

  // Prescription Modal State
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [prescriptionItems, setPrescriptionItems] = useState([{ medicine_name: '', dosage: '', frequency: '', duration: '' }]);
  const [submittingRx, setSubmittingRx] = useState(false);

  // Visit Modal State
  const [showVisitModal, setShowVisitModal] = useState(false);
  const [visitForm, setVisitForm] = useState({ chief_complaint: '', diagnosis: '', advice: '' });
  const [submittingVisit, setSubmittingVisit] = useState(false);

  // Edit Profile State
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({ full_name: '', phone: '', email: '', age: '', gender: '', blood_group: '', address: '', date_of_birth: '', emergency_contact: '' });
  const [submittingEdit, setSubmittingEdit] = useState(false);

  // Appointment Modal State
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [appointmentForm, setAppointmentForm] = useState({ date: '', time: '', symptoms: '' });
  const [submittingAppt, setSubmittingAppt] = useState(false);

  useEffect(() => {
    fetchPatient();
  }, [id]);

  useEffect(() => {
    if (searchParams.get('tab')) {
      setActiveTab(searchParams.get('tab'));
    }
  }, [searchParams]);

  const fetchPatient = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/admin/patients/${id}`);
      if (res.data.success) {
        setPatient(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching patient profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPrescriptionItem = () => {
    setPrescriptionItems([...prescriptionItems, { medicine_name: '', dosage: '', frequency: '', duration: '' }]);
  };

  const handlePrescriptionChange = (index, field, value) => {
    const newItems = [...prescriptionItems];
    newItems[index][field] = value;
    setPrescriptionItems(newItems);
  };

  const handleSavePrescription = async () => {
    if (prescriptionItems.some(i => !i.medicine_name)) return alert("Medicine name is required for all items");
    try {
      setSubmittingRx(true);
      const payload = {
        patient_id: patient.patient_id,
        visit_id: patient.visits?.[0]?.id || null, // attach to latest visit if any
        doctor_id: 1, // Hack for now, should get from logged in doctor
        items: prescriptionItems
      };
      await api.post('/admin/prescriptions', payload);
      setShowPrescriptionModal(false);
      setPrescriptionItems([{ medicine_name: '', dosage: '', frequency: '', duration: '' }]);
      fetchPatient(); // reload to show new rx
    } catch (error) {
      console.error("Failed to save rx", error);
      alert("Failed to save prescription.");
    } finally {
      setSubmittingRx(false);
    }
  };

  const handleSaveVisit = async () => {
    if (!visitForm.chief_complaint && !visitForm.diagnosis && !visitForm.advice) {
      return alert("Please fill at least one field.");
    }
    try {
      setSubmittingVisit(true);
      const payload = {
        patient_id: patient.patient_id,
        doctor_id: 1, // Hack for now, should get from logged in doctor
        visit_date: new Date().toISOString().split('T')[0],
        ...visitForm
      };
      await api.post('/admin/visits', payload);
      setShowVisitModal(false);
      setVisitForm({ chief_complaint: '', diagnosis: '', advice: '' });
      fetchPatient(); // reload to show new visit
    } catch (error) {
      console.error("Failed to save visit", error);
      alert("Failed to save visit record.");
    } finally {
      setSubmittingVisit(false);
    }
  };

  const handleEditClick = () => {
    setEditForm({
      full_name: patient.full_name || '',
      phone: patient.phone || '',
      email: patient.email && patient.email.includes('@noemail.com') ? '' : (patient.email || ''),
      age: patient.age || '',
      gender: patient.gender || '',
      blood_group: patient.blood_group || '',
      address: patient.address || '',
      date_of_birth: patient.date_of_birth ? new Date(patient.date_of_birth).toISOString().split('T')[0] : '',
      emergency_contact: patient.emergency_contact || ''
    });
    setShowEditModal(true);
  };

  const handleSaveProfile = async () => {
    if (!editForm.full_name || !editForm.phone) {
      return alert("Full Name and Phone are required.");
    }
    try {
      setSubmittingEdit(true);
      await api.put(`/admin/patients/${patient.patient_id}`, editForm);
      setShowEditModal(false);
      fetchPatient(); // reload to show updated details
    } catch (error) {
      console.error("Failed to update profile", error);
      alert("Failed to update profile.");
    } finally {
      setSubmittingEdit(false);
    }
  };

  const handleSaveAppointment = async () => {
    if (!appointmentForm.date || !appointmentForm.time) return alert("Date and Time are required.");
    try {
      setSubmittingAppt(true);
      const payload = {
        doctor_id: 1, // Default Dr. Borude
        appointment_date: appointmentForm.date,
        // if length is 5 (HH:mm), append :00
        appointment_time: appointmentForm.time.length === 5 ? appointmentForm.time + ':00' : appointmentForm.time,
        symptoms: appointmentForm.symptoms,
        patient_name: patient.full_name,
        patient_email: patient.email,
        patient_phone: patient.phone,
        patient_uid: patient.patient_uid,
        age: patient.age,
        gender: patient.gender,
        blood_group: patient.blood_group
      };
      await api.post('/appointments', payload);
      setShowAppointmentModal(false);
      setAppointmentForm({ date: '', time: '', symptoms: '' });
      fetchPatient();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to book appointment");
    } finally {
      setSubmittingAppt(false);
    }
  };

  const handlePrintPrescription = (rx) => {
    const printWindow = window.open('', '_blank');
    const itemsHtml = patient.medicines.filter(m => m.created_at === rx.prescription_date).map(m => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>${m.medicine_name}</strong></td>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${m.dosage}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${m.frequency}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${m.duration}</td>
      </tr>
    `).join('');

    printWindow.document.write(`
      <html>
        <head>
          <title>Prescription ${rx.prescription_uid}</title>
          <style>body { font-family: system-ui; padding: 40px; color: #333; } th { text-align: left; background: #f8f9fa; padding: 10px; }</style>
        </head>
        <body>
          <div style="text-align: center; margin-bottom: 40px;">
            <h1 style="color: #2563eb; margin: 0;">Varad Netralaya</h1>
            <p style="color: #666; margin: 5px 0;">Patient: ${patient.full_name} (UHID: ${patient.patient_uid})</p>
            <p style="color: #666; margin: 0;">Date: ${new Date(rx.prescription_date).toLocaleDateString()} | Dr. ${rx.doctor_name}</p>
          </div>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr><th>Medicine</th><th>Dosage</th><th>Frequency</th><th>Duration</th></tr>
            </thead>
            <tbody>${itemsHtml}</tbody>
          </table>
          <div style="margin-top: 60px; text-align: right;">
            <p><strong>Dr. ${rx.doctor_name}</strong></p>
            <p style="color: #666;">Signature</p>
          </div>
          <script>window.print();</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Patient Not Found</h2>
        <button onClick={() => navigate('/admin/patients')} className="mt-4 text-blue-600 hover:underline flex items-center justify-center gap-2 mx-auto">
          <FaArrowLeft /> Back to Directory
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <button onClick={() => navigate('/admin/patients')} className="text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center gap-2 transition-colors font-medium text-sm">
        <FaArrowLeft /> Back to Directory
      </button>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex items-start gap-5">
            <div className="h-16 w-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center text-3xl font-bold shrink-0">
              {patient.full_name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{patient.full_name}</h1>
              <div className="flex flex-wrap items-center gap-3 mt-2">
                <span className="font-mono font-bold text-sm bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-700 dark:text-slate-300">
                  {patient.patient_uid || 'UHID Missing'}
                </span>
                <span className="text-sm font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                  {patient.age ? `${patient.age} yrs` : 'Age N/A'} • {patient.gender || 'N/A'}
                </span>
                <span className="text-sm font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                  {patient.blood_group || 'Blood Group N/A'}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-slate-500 dark:text-slate-400">
                <p className="flex items-center gap-1.5"><FaPhoneAlt className="text-slate-400" /> {patient.phone || 'N/A'}</p>
                <p className="flex items-center gap-1.5"><FaEnvelope className="text-slate-400" /> {(patient.email && patient.email.includes('@noemail.com')) ? 'Not Provided' : (patient.email || 'N/A')}</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-2 min-w-[200px] bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Total Visits</span>
              <span className="font-bold text-slate-800 dark:text-white">{patient.total_visits || 0}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Last Visit</span>
              <span className="font-bold text-slate-800 dark:text-white">{patient.last_visit ? new Date(patient.last_visit).toLocaleDateString() : 'None'}</span>
            </div>
            <button 
              onClick={() => setShowAppointmentModal(true)}
              className="mt-2 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold transition-colors">
              Book Appointment
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-2 pb-2 hide-scrollbar border-b border-slate-200 dark:border-slate-800">
        {[
          { id: 'overview', label: 'Overview', icon: <FaUser /> },
          { id: 'medical', label: 'Medical History & Visits', icon: <FaHistory /> },
          { id: 'appointments', label: 'Appointments', icon: <FaCalendarAlt /> },
          { id: 'prescriptions', label: 'Prescriptions', icon: <FaPrescriptionBottleAlt /> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-bold whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab.id 
                ? 'border-blue-600 text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/10 rounded-t-lg' 
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-t-lg'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">Personal Details</h3>
                <button onClick={handleEditClick} className="text-xs text-blue-600 font-bold hover:underline">Edit Profile</button>
              </div>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-slate-500 mb-1">Date of Birth</p>
                  <p className="font-medium text-slate-800 dark:text-white">{patient.date_of_birth ? new Date(patient.date_of_birth).toLocaleDateString() : 'N/A'}</p>
                </div>
                <div>
                  <p className="text-slate-500 mb-1">Address</p>
                  <p className="font-medium text-slate-800 dark:text-white">{patient.address || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-slate-500 mb-1">Emergency Contact</p>
                  <p className="font-medium text-slate-800 dark:text-white">{patient.emergency_contact || 'N/A'}</p>
                </div>

                {/* Show Latest Booking Data if available */}
                {patient.appointments && patient.appointments.length > 0 && (
                  <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
                    <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-3 text-xs uppercase tracking-wider">Latest Booking Details</h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-slate-500 mb-1 text-xs">Appointment Time & Date</p>
                        <p className="font-medium text-slate-800 dark:text-white">
                          {new Date(patient.appointments[0].appointment_date).toLocaleDateString()} at {patient.appointments[0].appointment_time}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-500 mb-1 text-xs">Department / Service</p>
                        <p className="font-medium text-slate-800 dark:text-white">
                          {patient.appointments[0].service_name || 'General'} {patient.appointments[0].doctor_name ? `(${patient.appointments[0].doctor_name})` : ''}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-500 mb-1 text-xs">Description / Symptoms</p>
                        <p className="font-medium text-slate-800 dark:text-white line-clamp-2">
                          {patient.appointments[0].symptoms || 'None provided'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Known Medical History</h3>
              {patient.medical_history ? (
                <div className="prose prose-sm dark:prose-invert">
                  <p className="text-slate-600 dark:text-slate-300">{patient.medical_history}</p>
                </div>
              ) : (
                <p className="text-slate-500 italic">No historical medical notes recorded.</p>
              )}
            </div>
          </div>
        )}

        {/* MEDICAL HISTORY / VISITS TAB */}
        {activeTab === 'medical' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">Consultation Visits</h3>
              <button 
                onClick={() => setShowVisitModal(true)}
                className="px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-sm font-bold transition-colors">
                + New Visit Record
              </button>
            </div>
            
            <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 space-y-8 pb-4">
              {patient.visits?.length === 0 ? (
                <p className="ml-6 text-slate-500 py-4">No past visits recorded.</p>
              ) : (
                patient.visits?.map((visit) => (
                  <div key={visit.id} className="relative ml-8">
                    <div className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-white dark:border-slate-950 bg-blue-500 shadow-sm"></div>
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-bold text-blue-600 dark:text-blue-400">{new Date(visit.visit_date).toLocaleDateString()}</p>
                          <p className="text-xs font-mono text-slate-400 mt-0.5">{visit.visit_uid}</p>
                        </div>
                        <span className="text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Dr. {visit.doctor_name}</span>
                      </div>
                      
                      <div className="space-y-3 text-sm">
                        {visit.chief_complaint && (
                          <div>
                            <span className="font-bold text-slate-700 dark:text-slate-300">Complaint: </span>
                            <span className="text-slate-600 dark:text-slate-400">{visit.chief_complaint}</span>
                          </div>
                        )}
                        {visit.diagnosis && (
                          <div>
                            <span className="font-bold text-slate-700 dark:text-slate-300">Diagnosis: </span>
                            <span className="text-slate-600 dark:text-slate-400">{visit.diagnosis}</span>
                          </div>
                        )}
                        {visit.advice && (
                          <div className="bg-amber-50 dark:bg-amber-900/10 p-3 rounded-lg border border-amber-100 dark:border-amber-900/30">
                            <span className="font-bold text-amber-800 dark:text-amber-500 block mb-1">Doctor's Advice:</span>
                            <span className="text-amber-700 dark:text-amber-400">{visit.advice}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* APPOINTMENTS TAB */}
        {activeTab === 'appointments' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
             <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-bold">Date & Time</th>
                  <th className="px-6 py-4 font-bold">Appointment No</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold">Issue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {patient.appointments?.length === 0 ? (
                  <tr><td colSpan="4" className="px-6 py-8 text-center text-slate-500">No appointments</td></tr>
                ) : (
                  patient.appointments?.map(appt => (
                    <tr key={appt.id}>
                      <td className="px-6 py-4 font-medium">{new Date(appt.appointment_date).toLocaleDateString()} at {appt.appointment_time}</td>
                      <td className="px-6 py-4 font-mono text-slate-500">{appt.appointment_no}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${appt.status === 'COMPLETED' ? 'bg-teal-100 text-teal-700' : 'bg-slate-100 text-slate-600'}`}>
                          {appt.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{appt.symptoms || '-'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* PRESCRIPTIONS TAB */}
        {activeTab === 'prescriptions' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">Medical Prescriptions</h3>
              <button 
                onClick={() => setShowPrescriptionModal(true)}
                className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg text-sm font-bold transition-colors shadow-sm shadow-blue-500/20"
              >
                + Write Prescription
              </button>
            </div>

            {patient.prescriptions?.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-800 text-slate-500">
                <FaPrescriptionBottleAlt className="mx-auto text-4xl mb-3 text-slate-300" />
                No prescriptions found for this patient.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {patient.prescriptions?.map(rx => (
                  <div key={rx.id} className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm hover:border-blue-300 transition-colors cursor-pointer">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-slate-800 dark:text-white">{new Date(rx.prescription_date).toLocaleDateString()}</span>
                        <span className="text-xs font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-500">{rx.prescription_uid}</span>
                      </div>
                      <p className="text-sm text-slate-500 mt-1">Prescribed by Dr. {rx.doctor_name}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg transition-colors border border-slate-200" title="View"><FaEye /></button>
                      <button onClick={() => handlePrintPrescription(rx)} className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors border border-blue-200" title="Print"><FaPrint /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Medicine History */}
            {patient.medicines?.length > 0 && (
              <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Complete Medicine History</h3>
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500">
                      <tr>
                        <th className="px-4 py-3 font-bold">Medicine</th>
                        <th className="px-4 py-3 font-bold">Dose</th>
                        <th className="px-4 py-3 font-bold">Frequency</th>
                        <th className="px-4 py-3 font-bold">Duration</th>
                        <th className="px-4 py-3 font-bold">Date Prescribed</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {patient.medicines?.map((med, idx) => (
                        <tr key={idx}>
                          <td className="px-4 py-3 font-medium text-slate-800 dark:text-white">{med.medicine_name}</td>
                          <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{med.dosage || '-'}</td>
                          <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{med.frequency || '-'}</td>
                          <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{med.duration || '-'}</td>
                          <td className="px-4 py-3 text-slate-500">{new Date(med.created_at).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Prescription Modal */}
      {showPrescriptionModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-3xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <FaPrescriptionBottleAlt className="text-blue-600" /> Write Prescription
              </h3>
              <button onClick={() => setShowPrescriptionModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white"><FaTimes size={20}/></button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 bg-slate-50 dark:bg-slate-950">
              <div className="space-y-4">
                {prescriptionItems.map((item, idx) => (
                  <div key={idx} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1 w-full">
                      <label className="block text-xs font-bold text-slate-500 mb-1">Medicine Name *</label>
                      <input 
                        type="text" 
                        value={item.medicine_name} 
                        onChange={e => handlePrescriptionChange(idx, 'medicine_name', e.target.value)}
                        placeholder="e.g. Paracetamol 500mg"
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div className="w-full md:w-32">
                      <label className="block text-xs font-bold text-slate-500 mb-1">Dosage</label>
                      <input 
                        type="text" 
                        value={item.dosage} 
                        onChange={e => handlePrescriptionChange(idx, 'dosage', e.target.value)}
                        placeholder="e.g. 1 Tablet"
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div className="w-full md:w-32">
                      <label className="block text-xs font-bold text-slate-500 mb-1">Frequency</label>
                      <select 
                        value={item.frequency} 
                        onChange={e => handlePrescriptionChange(idx, 'frequency', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      >
                        <option value="">Select...</option>
                        <option value="1-0-0">1-0-0 (Morning)</option>
                        <option value="1-0-1">1-0-1 (Morning, Night)</option>
                        <option value="1-1-1">1-1-1 (Thrice a day)</option>
                        <option value="0-0-1">0-0-1 (Night only)</option>
                        <option value="SOS">SOS (As needed)</option>
                      </select>
                    </div>
                    <div className="w-full md:w-32">
                      <label className="block text-xs font-bold text-slate-500 mb-1">Duration</label>
                      <input 
                        type="text" 
                        value={item.duration} 
                        onChange={e => handlePrescriptionChange(idx, 'duration', e.target.value)}
                        placeholder="e.g. 5 Days"
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <button 
                      onClick={() => setPrescriptionItems(prescriptionItems.filter((_, i) => i !== idx))}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200 mb-0.5"
                      disabled={prescriptionItems.length === 1}
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}

                <button 
                  onClick={handleAddPrescriptionItem}
                  className="w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl text-slate-500 font-bold text-sm hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
                >
                  <FaPlus /> Add Medicine
                </button>
              </div>
            </div>

            <div className="p-6 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3 bg-white dark:bg-slate-900">
              <button 
                onClick={() => setShowPrescriptionModal(false)}
                className="px-6 py-2.5 text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSavePrescription}
                disabled={submittingRx}
                className="px-6 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm shadow-blue-500/30 disabled:opacity-50"
              >
                {submittingRx ? 'Saving...' : 'Save & Issue Prescription'}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Visit Modal */}
      {showVisitModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-2xl border border-slate-200 dark:border-slate-800 flex flex-col">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <FaStethoscope className="text-blue-600" /> New Visit Record
              </h3>
              <button onClick={() => setShowVisitModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white"><FaTimes size={20}/></button>
            </div>
            
            <div className="p-6 overflow-y-auto bg-slate-50 dark:bg-slate-950 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Chief Complaint</label>
                <textarea 
                  value={visitForm.chief_complaint}
                  onChange={e => setVisitForm({...visitForm, chief_complaint: e.target.value})}
                  rows="2"
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="E.g. Blurry vision in right eye..."
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Diagnosis</label>
                <textarea 
                  value={visitForm.diagnosis}
                  onChange={e => setVisitForm({...visitForm, diagnosis: e.target.value})}
                  rows="2"
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="E.g. Mild Cataract"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Advice</label>
                <textarea 
                  value={visitForm.advice}
                  onChange={e => setVisitForm({...visitForm, advice: e.target.value})}
                  rows="3"
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="E.g. Wear sunglasses, return for surgery in 6 months..."
                />
              </div>
            </div>
            
            <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex justify-end gap-3 rounded-b-2xl">
              <button 
                onClick={() => setShowVisitModal(false)}
                className="px-5 py-2.5 text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveVisit}
                disabled={submittingVisit}
                className="px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl shadow-md hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {submittingVisit ? 'Saving...' : 'Save Record'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <FaUser className="text-blue-600" /> Edit Patient Profile
              </h3>
              <button onClick={() => setShowEditModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white"><FaTimes size={20}/></button>
            </div>
            
            <div className="p-6 overflow-y-auto bg-slate-50 dark:bg-slate-950 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name *</label>
                  <input type="text" value={editForm.full_name} onChange={e => setEditForm({...editForm, full_name: e.target.value})} className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Phone Number *</label>
                  <input type="text" value={editForm.phone} onChange={e => setEditForm({...editForm, phone: e.target.value})} className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                  <input type="email" value={editForm.email} onChange={e => setEditForm({...editForm, email: e.target.value})} className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Age</label>
                  <input type="number" value={editForm.age} onChange={e => setEditForm({...editForm, age: e.target.value})} className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Gender</label>
                  <select value={editForm.gender} onChange={e => setEditForm({...editForm, gender: e.target.value})} className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                    <option value="">Select...</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Blood Group</label>
                  <select value={editForm.blood_group} onChange={e => setEditForm({...editForm, blood_group: e.target.value})} className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                    <option value="">Select...</option>
                    <option value="A+">A+</option><option value="A-">A-</option>
                    <option value="B+">B+</option><option value="B-">B-</option>
                    <option value="AB+">AB+</option><option value="AB-">AB-</option>
                    <option value="O+">O+</option><option value="O-">O-</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Date of Birth</label>
                  <input type="date" value={editForm.date_of_birth} onChange={e => setEditForm({...editForm, date_of_birth: e.target.value})} className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Emergency Contact</label>
                  <input type="text" value={editForm.emergency_contact} onChange={e => setEditForm({...editForm, emergency_contact: e.target.value})} className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Address</label>
                  <textarea value={editForm.address} onChange={e => setEditForm({...editForm, address: e.target.value})} rows="2" className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex justify-end gap-3 rounded-b-2xl">
              <button 
                onClick={() => setShowEditModal(false)}
                className="px-5 py-2.5 text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveProfile}
                disabled={submittingEdit}
                className="px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl shadow-md hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {submittingEdit ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Appointment Modal */}
      {showAppointmentModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">Book Appointment</h3>
              <button onClick={() => setShowAppointmentModal(false)} className="text-slate-500 hover:text-slate-800 dark:hover:text-white">
                <FaTimes />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Date</label>
                <input 
                  type="date" 
                  value={appointmentForm.date} 
                  onChange={e => setAppointmentForm({...appointmentForm, date: e.target.value})}
                  className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Time</label>
                <select 
                  value={appointmentForm.time} 
                  onChange={e => setAppointmentForm({...appointmentForm, time: e.target.value})}
                  className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                >
                  <option value="">Select Time</option>
                  <optgroup label="🌅 Morning">
                    <option value="09:00">9:00 AM – 9:30 AM</option>
                    <option value="09:30">9:30 AM – 10:00 AM</option>
                    <option value="10:00">10:00 AM – 10:30 AM</option>
                    <option value="10:30">10:30 AM – 11:00 AM</option>
                    <option value="11:00">11:00 AM – 11:30 AM</option>
                    <option value="11:30">11:30 AM – 12:00 PM</option>
                  </optgroup>
                  <optgroup label="☀️ Afternoon">
                    <option value="14:00">2:00 PM – 2:30 PM</option>
                    <option value="14:30">2:30 PM – 3:00 PM</option>
                    <option value="15:00">3:00 PM – 3:30 PM</option>
                    <option value="15:30">3:30 PM – 4:00 PM</option>
                    <option value="16:00">4:00 PM – 4:30 PM</option>
                  </optgroup>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Description / Symptoms</label>
                <textarea 
                  value={appointmentForm.symptoms} 
                  onChange={e => setAppointmentForm({...appointmentForm, symptoms: e.target.value})}
                  rows="3"
                  className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                  placeholder="e.g. Regular Checkup"
                ></textarea>
              </div>
            </div>
            <div className="p-5 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3">
              <button onClick={() => setShowAppointmentModal(false)} className="px-4 py-2 text-sm font-bold text-slate-600 dark:text-slate-400">Cancel</button>
              <button onClick={handleSaveAppointment} disabled={submittingAppt} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold disabled:opacity-50">
                {submittingAppt ? 'Booking...' : 'Book Appointment'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientProfile;
