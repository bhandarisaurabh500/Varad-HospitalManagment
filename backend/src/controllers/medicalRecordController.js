const { pool } = require('../config/db');

/** POST /api/medical-records */
async function createRecord(req, res, next) {
  try {
    const { patient_id, appointment_id, visit_date, symptoms, diagnosis, prescription, notes, follow_up_date } = req.body;

    if (!patient_id || !visit_date) {
      return res.status(422).json({ success: false, message: 'patient_id and visit_date are required.' });
    }

    // Verify doctor identity
    const [drRows] = await pool.execute('SELECT id FROM doctors WHERE user_id=?', [req.user.id]);
    const doctorId = req.user.role === 'ADMIN'
      ? (req.body.doctor_id || null)
      : (drRows.length ? drRows[0].id : null);

    if (!doctorId) return res.status(422).json({ success: false, message: 'Doctor not found.' });

    const [result] = await pool.execute(
      `INSERT INTO medical_records
         (appointment_id, patient_id, doctor_id, visit_date, symptoms, diagnosis, prescription, notes, follow_up_date)
       VALUES (?,?,?,?,?,?,?,?,?)`,
      [appointment_id || null, patient_id, doctorId, visit_date, symptoms || null, diagnosis || null, prescription || null, notes || null, follow_up_date || null]
    );

    return res.status(201).json({ success: true, message: 'Medical record created.', id: result.insertId });
  } catch (err) { next(err); }
}

/** GET /api/medical-records/:id */
async function getRecordById(req, res, next) {
  try {
    const [rows] = await pool.execute(
      `SELECT mr.*, u_pat.full_name AS patient_name, u_doc.full_name AS doctor_name
       FROM medical_records mr
       JOIN patients pt ON pt.id = mr.patient_id
       JOIN users u_pat ON u_pat.id = pt.user_id
       JOIN doctors d ON d.id = mr.doctor_id
       JOIN users u_doc ON u_doc.id = d.user_id
       WHERE mr.id = ?`,
      [req.params.id]
    );
    if (!rows.length) return res.status(404).json({ success: false, message: 'Record not found.' });

    // Authorization: doctor can only see own records
    if (req.user.role === 'DOCTOR') {
      const [drRows] = await pool.execute('SELECT id FROM doctors WHERE user_id=?', [req.user.id]);
      if (!drRows.length || drRows[0].id !== rows[0].doctor_id) {
        return res.status(403).json({ success: false, message: 'Access denied.' });
      }
    }

    // Get prescriptions
    const [rx] = await pool.execute('SELECT * FROM prescriptions WHERE medical_record_id=?', [req.params.id]);
    return res.json({ success: true, data: { ...rows[0], prescriptions: rx } });
  } catch (err) { next(err); }
}

/** PUT /api/medical-records/:id */
async function updateRecord(req, res, next) {
  try {
    const { symptoms, diagnosis, prescription, notes, follow_up_date } = req.body;
    await pool.execute(
      'UPDATE medical_records SET symptoms=?, diagnosis=?, prescription=?, notes=?, follow_up_date=? WHERE id=?',
      [symptoms, diagnosis, prescription, notes, follow_up_date || null, req.params.id]
    );
    return res.json({ success: true, message: 'Medical record updated.' });
  } catch (err) { next(err); }
}

/** GET /api/doctor/medical-records - Doctor sees own */
async function getDoctorRecords(req, res, next) {
  try {
    const [drRows] = await pool.execute('SELECT id FROM doctors WHERE user_id=?', [req.user.id]);
    if (!drRows.length) return res.json({ success: true, data: [] });

    const [rows] = await pool.execute(
      `SELECT mr.id, mr.visit_date, mr.diagnosis, mr.follow_up_date, mr.created_at,
              u.full_name AS patient_name
       FROM medical_records mr
       JOIN patients pt ON pt.id = mr.patient_id
       JOIN users u ON u.id = pt.user_id
       WHERE mr.doctor_id = ?
       ORDER BY mr.visit_date DESC`,
      [drRows[0].id]
    );
    return res.json({ success: true, data: rows });
  } catch (err) { next(err); }
}

module.exports = { createRecord, getRecordById, updateRecord, getDoctorRecords };
