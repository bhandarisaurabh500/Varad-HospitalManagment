const { pool } = require('../config/db');

/**
 * Check if a doctor already has a confirmed/pending appointment at the given date+time.
 * Returns true if the slot is already taken.
 */
async function isSlotBooked(doctorId, appointmentDate, appointmentTime, excludeAppointmentId = null) {
  let query = `
    SELECT id FROM appointments
    WHERE doctor_id = ?
      AND appointment_date = ?
      AND appointment_time = ?
      AND status NOT IN ('CANCELLED', 'RESCHEDULED')
  `;
  const params = [doctorId, appointmentDate, appointmentTime];

  if (excludeAppointmentId) {
    query += ' AND id != ?';
    params.push(excludeAppointmentId);
  }

  const [rows] = await pool.execute(query, params);
  return rows.length > 0;
}

/**
 * Generate the next appointment number in format APT-YYYY-NNNNN
 */
async function generateAppointmentNo() {
  const year = new Date().getFullYear();
  const prefix = `APT-${year}-`;

  // Find the last real appointment (ignoring fake ones that contain 'F')
  const [rows] = await pool.execute(
    `SELECT appointment_no FROM appointments
     WHERE appointment_no LIKE ? AND appointment_no NOT LIKE ?
     ORDER BY id DESC LIMIT 1`,
    [`${prefix}%`, `${prefix}F%`]
  );

  let nextNum = 1;
  if (rows.length > 0) {
    const last = rows[0].appointment_no;
    const lastNum = parseInt(last.replace(prefix, ''), 10);
    if (!isNaN(lastNum)) nextNum = lastNum + 1;
  }

  return `${prefix}${String(nextNum).padStart(5, '0')}`;
}

module.exports = { isSlotBooked, generateAppointmentNo };
