const { pool } = require('../config/db');

/** POST /api/admin/visits - Create a clinical visit record */
async function createVisit(req, res, next) {
  try {
    const { patient_id, appointment_id, doctor_id, visit_date, chief_complaint, symptoms, diagnosis, advice } = req.body;
    
    if (!patient_id || !doctor_id || !visit_date) {
      return res.status(422).json({ success: false, message: 'patient_id, doctor_id, and visit_date are required' });
    }

    const year = new Date(visit_date).getFullYear();
    const randomSuffix = String(Math.floor(Math.random() * 1000000)).padStart(6, '0');
    const visit_uid = `VISIT-${year}-${randomSuffix}`;

    const [result] = await pool.execute(
      `INSERT INTO medical_records 
         (visit_uid, patient_id, appointment_id, doctor_id, visit_date, chief_complaint, symptoms, diagnosis, advice, visit_status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [visit_uid, patient_id, appointment_id || null, doctor_id, visit_date, chief_complaint || null, symptoms || null, diagnosis || null, advice || null, 'COMPLETED']
    );

    return res.status(201).json({ success: true, message: 'Visit record created successfully', data: { visit_id: result.insertId } });
  } catch (err) {
    next(err);
  }
}

module.exports = { createVisit };
