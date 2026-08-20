const { pool } = require('../config/db');
const bcrypt = require('bcryptjs');

/** GET /api/doctors - Public */
async function getDoctors(req, res, next) {
  try {
    const [rows] = await pool.execute(
      `SELECT d.id, u.full_name AS name, u.email, u.phone,
              d.qualification, d.specialization, d.experience_years,
              d.about, d.expertise, d.consultation_fee, d.photo_url, d.is_available,
              d.registration_no
       FROM doctors d
       JOIN users u ON u.id = d.user_id
       WHERE u.is_active = 1
       ORDER BY d.id`
    );
    const doctors = rows.map(d => ({
      ...d,
      expertise: safeJSON(d.expertise, []),
    }));
    return res.json({ success: true, data: doctors });
  } catch (err) {
    next(err);
  }
}

/** GET /api/doctors/:id - Public */
async function getDoctorById(req, res, next) {
  try {
    const [rows] = await pool.execute(
      `SELECT d.id, u.full_name AS name, u.email, u.phone,
              d.qualification, d.specialization, d.experience_years,
              d.about, d.expertise, d.consultation_fee, d.photo_url,
              d.is_available, d.registration_no
       FROM doctors d JOIN users u ON u.id = d.user_id
       WHERE d.id = ? AND u.is_active = 1`,
      [req.params.id]
    );
    if (!rows.length) return res.status(404).json({ success: false, message: 'Doctor not found.' });

    // Get availability
    const [avail] = await pool.execute(
      'SELECT day_of_week, start_time, end_time FROM doctor_availability WHERE doctor_id=? AND is_active=1',
      [req.params.id]
    );

    return res.json({
      success: true,
      data: { ...rows[0], expertise: safeJSON(rows[0].expertise, []), availability: avail },
    });
  } catch (err) {
    next(err);
  }
}

/** POST /api/doctors - Admin only */
async function createDoctor(req, res, next) {
  try {
    const {
      full_name, email, phone, password,
      qualification, specialization, experience_years,
      about, expertise, consultation_fee, registration_no,
    } = req.body;

    if (!full_name || !email || !password) {
      return res.status(422).json({ success: false, message: 'full_name, email, password are required.' });
    }

    const [existing] = await pool.execute('SELECT id FROM users WHERE email=?', [email]);
    if (existing.length) return res.status(409).json({ success: false, message: 'Email already exists.' });

    const hashed = await bcrypt.hash(password, 12);
    const [roleRows] = await pool.execute("SELECT id FROM roles WHERE name='DOCTOR'");
    const roleId = roleRows[0].id;

    const photo_url = req.file ? `/uploads/documents/${req.file.filename}` : null;

    const [userResult] = await pool.execute(
      'INSERT INTO users (role_id, full_name, email, phone, password) VALUES (?,?,?,?,?)',
      [roleId, full_name, email, phone || null, hashed]
    );

    await pool.execute(
      `INSERT INTO doctors (user_id, qualification, specialization, experience_years, about, expertise, consultation_fee, registration_no, photo_url)
       VALUES (?,?,?,?,?,?,?,?,?)`,
      [
        userResult.insertId,
        qualification || null, specialization || null,
        experience_years || 0, about || null,
        expertise ? JSON.stringify(expertise) : null,
        consultation_fee || 0, registration_no || null, photo_url,
      ]
    );

    return res.status(201).json({ success: true, message: 'Doctor created successfully.' });
  } catch (err) {
    next(err);
  }
}

/** PUT /api/doctors/:id - Admin only */
async function updateDoctor(req, res, next) {
  try {
    const {
      qualification, specialization, experience_years,
      about, expertise, consultation_fee, is_available,
    } = req.body;

    await pool.execute(
      `UPDATE doctors SET
         qualification=?, specialization=?, experience_years=?,
         about=?, expertise=?, consultation_fee=?, is_available=?
       WHERE id=?`,
      [
        qualification, specialization, experience_years || 0,
        about, expertise ? JSON.stringify(expertise) : null,
        consultation_fee || 0, is_available ?? 1,
        req.params.id,
      ]
    );
    return res.json({ success: true, message: 'Doctor updated.' });
  } catch (err) {
    next(err);
  }
}

/** DELETE /api/doctors/:id - Admin only (deactivate) */
async function deleteDoctor(req, res, next) {
  try {
    const [dr] = await pool.execute('SELECT user_id FROM doctors WHERE id=?', [req.params.id]);
    if (!dr.length) return res.status(404).json({ success: false, message: 'Doctor not found.' });
    await pool.execute('UPDATE users SET is_active=0 WHERE id=?', [dr[0].user_id]);
    return res.json({ success: true, message: 'Doctor deactivated.' });
  } catch (err) {
    next(err);
  }
}

function safeJSON(val, fallback) {
  try { return val ? JSON.parse(val) : fallback; }
  catch { return fallback; }
}

module.exports = { getDoctors, getDoctorById, createDoctor, updateDoctor, deleteDoctor };
