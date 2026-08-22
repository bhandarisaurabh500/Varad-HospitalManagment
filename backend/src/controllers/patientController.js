const { pool } = require('../config/db');

/** GET /api/patients/profile */
async function getProfile(req, res, next) {
  try {
    const [rows] = await pool.execute(
      `SELECT u.id, u.full_name, u.email, u.phone, u.profile_pic,
              p.id AS patient_id, p.age, p.gender, p.blood_group, p.address,
              p.date_of_birth, p.emergency_contact, p.medical_history
       FROM users u JOIN patients p ON p.user_id = u.id
       WHERE u.id = ?`,
      [req.user.id]
    );
    if (!rows.length) return res.status(404).json({ success: false, message: 'Profile not found.' });
    return res.json({ success: true, data: rows[0] });
  } catch (err) { next(err); }
}

/** PUT /api/patients/profile */
async function updateProfile(req, res, next) {
  try {
    const { full_name, phone, age, gender, blood_group, address, date_of_birth, emergency_contact } = req.body;

    await pool.execute(
      'UPDATE users SET full_name=?, phone=? WHERE id=?',
      [full_name, phone, req.user.id]
    );

    const [ptRows] = await pool.execute('SELECT id FROM patients WHERE user_id=?', [req.user.id]);
    if (ptRows.length) {
      await pool.execute(
        'UPDATE patients SET age=?, gender=?, blood_group=?, address=?, date_of_birth=?, emergency_contact=? WHERE user_id=?',
        [age || null, gender || null, blood_group || null, address || null, date_of_birth || null, emergency_contact || null, req.user.id]
      );
    }

    return res.json({ success: true, message: 'Profile updated.' });
  } catch (err) { next(err); }
}

/** GET /api/patients/appointments */
async function getPatientAppointments(req, res, next) {
  try {
    const [ptRows] = await pool.execute('SELECT id FROM patients WHERE user_id=?', [req.user.id]);
    if (!ptRows.length) return res.json({ success: true, data: [] });

    const [rows] = await pool.execute(
      `SELECT a.id, a.appointment_no, a.appointment_date, a.appointment_time,
              a.status, a.symptoms, a.age, a.gender, a.created_at,
              u.full_name AS doctor_name, d.qualification, d.specialization,
              s.name AS service_name
       FROM appointments a
       JOIN doctors d ON d.id = a.doctor_id
       JOIN users u ON u.id = d.user_id
       LEFT JOIN services s ON s.id = a.service_id
       WHERE a.patient_id = ?
       ORDER BY a.appointment_date DESC`,
      [ptRows[0].id]
    );
    return res.json({ success: true, data: rows });
  } catch (err) { next(err); }
}

/** GET /api/admin/patients - Admin */
async function getAllPatients(req, res, next) {
  try {
    const [rows] = await pool.execute(
      `SELECT u.id as user_id, u.full_name, u.email, u.phone, u.created_at, u.is_active,
              p.id AS patient_id, p.patient_uid, p.age, p.gender, p.blood_group,
              (SELECT MAX(visit_date) FROM medical_records mr WHERE mr.patient_id = p.id) as last_visit,
              (SELECT COUNT(*) FROM medical_records mr WHERE mr.patient_id = p.id) as total_visits
       FROM users u JOIN patients p ON p.user_id = u.id
       ORDER BY p.id DESC`
    );
    return res.json({ success: true, data: rows });
  } catch (err) { next(err); }
}

/** GET /api/patients/:id - Complete Profile (Admin/Doctor) */
async function getPatientById(req, res, next) {
  try {
    const [rows] = await pool.execute(
      `SELECT u.id as user_id, u.full_name, u.email, u.phone,
              p.id AS patient_id, p.patient_uid, p.age, p.gender, p.blood_group, p.address,
              p.date_of_birth, p.emergency_contact, p.medical_history,
              (SELECT MAX(visit_date) FROM medical_records mr WHERE mr.patient_id = p.id) as last_visit,
              (SELECT COUNT(*) FROM medical_records mr WHERE mr.patient_id = p.id) as total_visits
       FROM users u JOIN patients p ON p.user_id = u.id
       WHERE p.id = ?`,
      [req.params.id]
    );
    if (!rows.length) return res.status(404).json({ success: false, message: 'Patient not found.' });

    const patient = rows[0];

    // Get Visits
    const [visits] = await pool.execute(`
      SELECT mr.id, mr.visit_uid, mr.visit_date, mr.chief_complaint, mr.diagnosis, mr.advice, mr.visit_status,
             u.full_name as doctor_name
      FROM medical_records mr
      JOIN doctors d ON mr.doctor_id = d.id
      JOIN users u ON d.user_id = u.id
      WHERE mr.patient_id = ?
      ORDER BY mr.visit_date DESC
    `, [patient.patient_id]);
    
    // Get Appointments
    const [appointments] = await pool.execute(`
      SELECT a.id, a.appointment_no, a.appointment_date, a.appointment_time, a.status, a.symptoms
      FROM appointments a
      WHERE a.patient_id = ?
      ORDER BY a.appointment_date DESC
    `, [patient.patient_id]);

    // Get Prescriptions
    const [prescriptions] = await pool.execute(`
      SELECT p.id, p.prescription_uid, p.created_at as prescription_date,
             u.full_name as doctor_name
      FROM prescriptions p
      JOIN doctors d ON p.doctor_id = d.id
      JOIN users u ON d.user_id = u.id
      WHERE p.patient_id = ?
      ORDER BY p.created_at DESC
    `, [patient.patient_id]);

    // Get Medicine History
    const [medicines] = await pool.execute(`
      SELECT pi.medicine_name, pi.dosage, pi.frequency, pi.duration, p.created_at
      FROM prescription_items pi
      JOIN prescriptions p ON pi.prescription_id = p.id
      WHERE p.patient_id = ?
      ORDER BY p.created_at DESC
    `, [patient.patient_id]);

    patient.visits = visits;
    patient.appointments = appointments;
    patient.prescriptions = prescriptions;
    patient.medicines = medicines;

    return res.json({ success: true, data: patient });
  } catch (err) { next(err); }
}

/** GET /api/patients/search */
async function searchPatients(req, res, next) {
  try {
    const { q } = req.query;
    if (!q || q.length < 2) return res.json({ success: true, data: [] });
    const term = `%${q}%`;
    const [rows] = await pool.execute(`
      SELECT u.full_name, u.phone, u.email,
             p.id AS patient_id, p.patient_uid, p.age, p.gender,
             (SELECT MAX(visit_date) FROM medical_records mr WHERE mr.patient_id = p.id) as last_visit,
             (SELECT COUNT(*) FROM medical_records mr WHERE mr.patient_id = p.id) as total_visits
      FROM users u JOIN patients p ON p.user_id = u.id
      WHERE u.full_name ILIKE ? OR u.phone ILIKE ? OR p.patient_uid ILIKE ?
      LIMIT 10
    `, [term, term, term]);
    return res.json({ success: true, data: rows });
  } catch (err) { next(err); }
}

module.exports = { getProfile, updateProfile, getPatientAppointments, getAllPatients, getPatientById, searchPatients };
