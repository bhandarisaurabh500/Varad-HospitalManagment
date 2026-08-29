const { Pool } = require('pg');
require('dotenv').config();

async function checkDB() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  
  try {
    // Check notices table
    const notices = await pool.query('SELECT * FROM notices LIMIT 1');
    console.log('notices table OK. Columns:', Object.keys(notices.rows[0] || {}));
  } catch(e) {
    console.error('notices ERROR:', e.message);
  }
  
  try {
    // Check clinic_settings table
    const cs = await pool.query("SELECT column_name FROM information_schema.columns WHERE table_name='clinic_settings' ORDER BY ordinal_position");
    console.log('clinic_settings columns:', cs.rows.map(x => x.column_name));
  } catch(e) {
    console.error('clinic_settings ERROR:', e.message);
  }

  try {
    // Try query from clinic settings
    const cs2 = await pool.query('SELECT * FROM clinic_settings LIMIT 1');
    console.log('clinic_settings data:', cs2.rows);
  } catch(e) {
    console.error('clinic_settings query ERROR:', e.message);
  }

  try {
    // Check gallery table
    const gallery = await pool.query('SELECT id, title, image_url, category FROM gallery LIMIT 3');
    console.log('gallery data:', gallery.rows);
  } catch(e) {
    console.error('gallery ERROR:', e.message);
  }
  
  process.exit();
}

checkDB();
