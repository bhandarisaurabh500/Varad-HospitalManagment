const { pool } = require('./src/config/db');
async function run() {
  try {
    const res = await pool.query("SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = 'appointments'");
    console.log(res.rows);
  } catch(e) {
    console.error(e);
  }
  process.exit(0);
}
run();
