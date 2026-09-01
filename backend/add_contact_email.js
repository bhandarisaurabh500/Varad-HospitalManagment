require('dotenv').config({ path: __dirname + '/.env' });
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function run() {
  try {
    await pool.query('ALTER TABLE patients ADD COLUMN contact_email VARCHAR(255);');
    console.log('Added contact_email to patients');
  } catch(e) {
    console.error(e.message);
  } finally {
    pool.end();
  }
}
run();
