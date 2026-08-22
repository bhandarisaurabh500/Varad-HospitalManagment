const { pool } = require('../config/db');

/** POST /api/admin/prescriptions - Create a prescription */
async function createPrescription(req, res, next) {
  try {
    const { patient_id, visit_id, doctor_id, items } = req.body;
    
    if (!patient_id || !visit_id || !doctor_id || !items || !Array.isArray(items)) {
      return res.status(422).json({ success: false, message: 'Invalid payload for prescription' });
    }

    const year = new Date().getFullYear();
    const randomSuffix = String(Math.floor(Math.random() * 1000000)).padStart(6, '0');
    const prescription_uid = `RX-${year}-${randomSuffix}`;

    const [headerResult] = await pool.execute(
      `INSERT INTO prescriptions (prescription_uid, patient_id, visit_id, doctor_id) VALUES (?, ?, ?, ?)`,
      [prescription_uid, patient_id, visit_id, doctor_id]
    );

    const prescriptionId = headerResult.insertId;

    for (const item of items) {
      await pool.execute(
        `INSERT INTO prescription_items 
           (prescription_id, medicine_name, dosage, frequency, duration, instructions)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [prescriptionId, item.medicine_name, item.dosage || '', item.frequency || '', item.duration || '', item.instructions || '']
      );
    }

    return res.status(201).json({ success: true, message: 'Prescription created successfully', data: { prescription_id: prescriptionId } });
  } catch (err) {
    next(err);
  }
}

/** GET /api/admin/medicines - Get active medicine master */
async function getMedicines(req, res, next) {
  try {
    const [rows] = await pool.execute(`SELECT name, generic_name, brand_name FROM medicine_master WHERE is_active = true ORDER BY name ASC`);
    return res.json({ success: true, data: rows });
  } catch (err) {
    next(err);
  }
}

module.exports = { createPrescription, getMedicines };
