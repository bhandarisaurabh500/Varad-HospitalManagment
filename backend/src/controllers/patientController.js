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
      `SELECT u.id, u.full_name, u.email, u.phone, u.created_at, u.is_active,
              p.id AS patient_id, p.age, p.gender, p.blood_group
       FROM users u JOIN patients p ON p.user_id = u.id
       ORDER BY u.created_at DESC`
    );
    return res.json({ success: true, data: rows });
  } catch (err) { next(err); }
}

module.exports = { getProfile, updateProfile, getPatientAppointments, getAllPatients };
