const { pool } = require('./src/config/db');

async function check() {
  try {
    const [rows] = await pool.execute('SELECT * FROM appointments');
    console.log('Appointments in DB:', rows.length);
    console.log(rows);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
check();
