const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/db');
const { validationResult } = require('express-validator');

/** POST /api/auth/register */
async function register(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ success: false, errors: errors.array() });
    }

    const { full_name, email, phone, password } = req.body;

    // Check duplicate email
    const [existing] = await pool.execute(
      'SELECT id FROM users WHERE email = ?', [email]
    );
    if (existing.length > 0) {
      return res.status(409).json({ success: false, message: 'Email already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const [roleRows] = await pool.execute("SELECT id FROM roles WHERE name='PATIENT'");
    const roleId = roleRows[0].id;

    const [result] = await pool.execute(
      'INSERT INTO users (role_id, full_name, email, phone, password) VALUES (?,?,?,?,?)',
      [roleId, full_name, email, phone || null, hashedPassword]
    );

    const userId = result.insertId;

    // Create patient profile
    await pool.execute(
      'INSERT INTO patients (user_id) VALUES (?)', [userId]
    );

    const token = signToken({ id: userId, role: 'PATIENT', name: full_name, email });

    return res.status(201).json({
      success: true,
      message: 'Registration successful.',
      token,
      user: { id: userId, full_name, email, role: 'PATIENT' },
    });
  } catch (err) {
    next(err);
  }
}

/** POST /api/auth/login */
async function login(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;

    const [rows] = await pool.execute(
      `SELECT u.id, u.full_name, u.email, u.phone, u.password, u.is_active,
              r.name AS role, u.profile_pic
       FROM users u
       JOIN roles r ON r.id = u.role_id
       WHERE u.email = ?`,
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const user = rows[0];
    if (!user.is_active) {
      return res.status(403).json({ success: false, message: 'Account is deactivated. Contact admin.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    // Get role-specific ID (doctor_id or patient_id)
    let roleId = null;
    if (user.role === 'DOCTOR') {
      const [dr] = await pool.execute('SELECT id FROM doctors WHERE user_id=?', [user.id]);
      if (dr.length) roleId = dr[0].id;
    } else if (user.role === 'PATIENT') {
      const [pt] = await pool.execute('SELECT id FROM patients WHERE user_id=?', [user.id]);
      if (pt.length) roleId = pt[0].id;
    }

    const token = signToken({ id: user.id, role: user.role, name: user.full_name, email: user.email, roleId });

    const { password: _p, ...safeUser } = user;
    return res.json({
      success: true,
      token,
      user: { ...safeUser, roleId },
    });
  } catch (err) {
    next(err);
  }
}

/** GET /api/auth/me */
async function getMe(req, res, next) {
  try {
    const [rows] = await pool.execute(
      `SELECT u.id, u.full_name, u.email, u.phone, u.profile_pic, r.name AS role
       FROM users u JOIN roles r ON r.id = u.role_id
       WHERE u.id = ?`,
      [req.user.id]
    );
    if (!rows.length) return res.status(404).json({ success: false, message: 'User not found.' });
    return res.json({ success: true, user: rows[0] });
  } catch (err) {
    next(err);
  }
}

function signToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
}

module.exports = { register, login, getMe };
