const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
require('dotenv').config();

async function reset() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const hash = await bcrypt.hash('admin@123', 12);
  
  const res = await pool.query("SELECT * FROM users WHERE username='admin' OR email='bhandarisaurabh500@gmail.com' OR role_id=(SELECT id FROM roles WHERE name='ADMIN')");
  console.log('Found users:', res.rows.length);
  if (res.rows.length > 0) {
    const u = res.rows.find(u => u.username === 'admin') || res.rows.find(u => u.email === 'bhandarisaurabh500@gmail.com') || res.rows[0];
    await pool.query("UPDATE users SET password=$1, username='admin' WHERE id=$2", [hash, u.id]);
    console.log('Updated user id:', u.id, 'email:', u.email, 'to username admin and password admin@123');
  } else {
    console.log('No admin user found!');
  }
  process.exit();
}
reset();
