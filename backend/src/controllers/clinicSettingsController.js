const { pool } = require('../config/db');

async function getClinicSettings(req, res, next) {
  try {
    const [rows] = await pool.execute('SELECT * FROM clinic_settings WHERE id = 1');
    return res.json({ success: true, data: rows[0] || {} });
  } catch (err) { next(err); }
}

async function updateClinicSettings(req, res, next) {
  try {
    const { appointment_mobile, clinic_phone } = req.body;
    const [existing] = await pool.execute('SELECT id FROM clinic_settings WHERE id = 1');
    if (existing.length === 0) {
      await pool.execute(
        'INSERT INTO clinic_settings (id, appointment_mobile, clinic_phone) VALUES (1, ?, ?)',
        [appointment_mobile, clinic_phone]
      );
    } else {
      await pool.execute(
        'UPDATE clinic_settings SET appointment_mobile = ?, clinic_phone = ?, updated_at = NOW() WHERE id = 1',
        [appointment_mobile, clinic_phone]
      );
    }
    return res.json({ success: true, message: 'Settings updated successfully.' });
  } catch (err) { next(err); }
}

module.exports = { getClinicSettings, updateClinicSettings };
