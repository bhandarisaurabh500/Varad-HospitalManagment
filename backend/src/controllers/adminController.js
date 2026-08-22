const { pool } = require('../config/db');

/** GET /api/admin/dashboard */
async function getDashboard(req, res, next) {
  try {
    const today = new Date().toISOString().split('T')[0];

    const [[{ total_doctors }]]   = await pool.execute("SELECT COUNT(*) AS total_doctors FROM doctors d JOIN users u ON u.id=d.user_id WHERE u.is_active=1");
    const [[{ total_patients }]]  = await pool.execute("SELECT COUNT(*) AS total_patients FROM patients");
    const [[{ today_appt }]]      = await pool.execute("SELECT COUNT(*) AS today_appt FROM appointments WHERE appointment_date=?", [today]);
    const [[{ pending_appt }]]    = await pool.execute("SELECT COUNT(*) AS pending_appt FROM appointments WHERE status='PENDING'");
    const [[{ confirmed_appt }]]  = await pool.execute("SELECT COUNT(*) AS confirmed_appt FROM appointments WHERE status='CONFIRMED'");
    const [[{ completed_appt }]]  = await pool.execute("SELECT COUNT(*) AS completed_appt FROM appointments WHERE status='COMPLETED'");
    const [[{ total_appt }]]      = await pool.execute("SELECT COUNT(*) AS total_appt FROM appointments");
    const [[{ unread_msgs }]]     = await pool.execute("SELECT COUNT(*) AS unread_msgs FROM contact_messages WHERE is_read=0");

    return res.json({
      success: true,
      data: {
        total_doctors,
        total_patients,
        today_appt,
        pending_appt,
        confirmed_appt,
        completed_appt,
        total_appt,
        unread_msgs,
      },
    });
  } catch (err) { next(err); }
}

/** GET /api/admin/users */
async function getUsers(req, res, next) {
  try {
    const [rows] = await pool.execute(
      `SELECT u.id, u.full_name, u.email, u.phone, u.is_active, u.created_at, r.name AS role
       FROM users u JOIN roles r ON r.id = u.role_id
       ORDER BY u.created_at DESC`
    );
    return res.json({ success: true, data: rows });
  } catch (err) { next(err); }
}

/** GET /api/admin/appointments */
async function getAdminAppointments(req, res, next) {
  try {
    const { status, date } = req.query;
    let query = `
      SELECT a.id, a.appointment_no, a.appointment_date, a.appointment_time, a.status,
             a.symptoms, a.age, a.gender, a.created_at,
             u_pat.full_name AS patient_name, u_pat.phone AS patient_phone, u_pat.email as patient_email,
             pt.id as patient_id, pt.patient_uid,
             u_doc.full_name AS doctor_name,
             s.name AS service_name,
             (SELECT MAX(visit_date) FROM medical_records mr WHERE mr.patient_id = a.patient_id) as last_visit
      FROM appointments a
      JOIN patients pt ON pt.id = a.patient_id
      JOIN users u_pat ON u_pat.id = pt.user_id
      JOIN doctors d ON d.id = a.doctor_id
      JOIN users u_doc ON u_doc.id = d.user_id
      LEFT JOIN services s ON s.id = a.service_id
      WHERE 1=1
    `;
    const params = [];
    if (status) { query += ' AND a.status=?'; params.push(status); }
    if (date)   { query += ' AND a.appointment_date=?'; params.push(date); }
    query += ' ORDER BY a.appointment_date DESC, a.appointment_time DESC';

    const [rows] = await pool.execute(query, params);
    return res.json({ success: true, data: rows });
  } catch (err) { next(err); }
}

/** GET /api/admin/contact-messages */
async function getContactMessages(req, res, next) {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM contact_messages ORDER BY created_at DESC'
    );
    return res.json({ success: true, data: rows });
  } catch (err) { next(err); }
}

/** PUT /api/admin/contact-messages/:id/read */
async function markMessageRead(req, res, next) {
  try {
    await pool.execute('UPDATE contact_messages SET is_read=1 WHERE id=?', [req.params.id]);
    return res.json({ success: true, message: 'Marked as read.' });
  } catch (err) { next(err); }
}

/** GET /api/doctor/dashboard */
async function getDoctorDashboard(req, res, next) {
  try {
    const [drRows] = await pool.execute('SELECT id FROM doctors WHERE user_id=?', [req.user.id]);
    if (!drRows.length) return res.status(404).json({ success: false, message: 'Doctor profile not found.' });
    const doctorId = drRows[0].id;
    const today = new Date().toISOString().split('T')[0];

    const [[{ today_appt }]]     = await pool.execute("SELECT COUNT(*) AS today_appt FROM appointments WHERE doctor_id=? AND appointment_date=?", [doctorId, today]);
    const [[{ upcoming_appt }]]  = await pool.execute("SELECT COUNT(*) AS upcoming_appt FROM appointments WHERE doctor_id=? AND appointment_date>? AND status NOT IN ('CANCELLED','COMPLETED')", [doctorId, today]);
    const [[{ total_patients }]] = await pool.execute("SELECT COUNT(DISTINCT patient_id) AS total_patients FROM appointments WHERE doctor_id=?", [doctorId]);
    const [[{ completed }]]      = await pool.execute("SELECT COUNT(*) AS completed FROM appointments WHERE doctor_id=? AND status='COMPLETED'", [doctorId]);

    return res.json({
      success: true,
      data: { today_appt, upcoming_appt, total_patients, completed },
    });
  } catch (err) { next(err); }
}

module.exports = { getDashboard, getUsers, getAdminAppointments, getContactMessages, markMessageRead, getDoctorDashboard };
