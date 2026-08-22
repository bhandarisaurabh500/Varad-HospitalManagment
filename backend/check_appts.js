require('dotenv').config();
const { pool } = require('./src/config/db');

async function checkAppointments() {
  try {
    const [rows] = await pool.execute(`
      SELECT a.id, a.appointment_no, a.appointment_date, a.appointment_time, pt.patient_uid, u.full_name 
      FROM appointments a 
      JOIN patients pt ON pt.id = a.patient_id 
      JOIN users u ON u.id = pt.user_id 
      ORDER BY a.id DESC LIMIT 10
    `);
    console.log("Latest 10 appointments:", rows);
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}

checkAppointments();
