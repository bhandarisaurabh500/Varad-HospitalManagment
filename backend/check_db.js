const { pool } = require('./src/config/db');

async function checkDB() {
  const tables = ['users', 'patients', 'appointments', 'medical_records', 'prescriptions'];
  for (const table of tables) {
    const res = await pool.query(`SELECT column_name, data_type FROM information_schema.columns WHERE table_name = '${table}'`);
    console.log(`\n--- ${table} ---`);
    res.rows.forEach(r => console.log(`${r.column_name}: ${r.data_type}`));
  }
  process.exit(0);
}
checkDB();
