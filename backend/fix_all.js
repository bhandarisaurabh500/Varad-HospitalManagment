const { Pool } = require('pg');
require('dotenv').config();

async function fixAll() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  // 1. Check admin user situation
  const allUsers = await pool.query("SELECT id, username, email FROM users WHERE role_id=(SELECT id FROM roles WHERE name='ADMIN')");
  console.log('Admin users:', allUsers.rows);

  // The email bhandarisaurabh500@gmail.com already exists for another user
  // We'll merge: update admin's email only if another row already has the email, 
  // delete the duplicate first or just keep admin with existing email
  // Strategy: admin user keeps username='admin', set email to bhandarisaurabh500@gmail.com
  // But there's a unique constraint. Let's check which user has that email
  const emailUser = await pool.query("SELECT id, username, email FROM users WHERE email='bhandarisaurabh500@gmail.com'");
  console.log('User with email bhandarisaurabh500@gmail.com:', emailUser.rows);

  // If admin has email='admin', change it to blank or a temp email, or merge the accounts
  // Best: delete duplicate patient row if it's not the admin, or just skip email update
  // For now: check if admin is already id=1 with email='admin', set email to a variant
  // Actually - let's just keep admin's email as 'bhandarisaurabh500@gmail.com'
  // and remove the duplicate user if it's a patient with no data
  const adminUser = await pool.query("SELECT id FROM users WHERE username='admin'");
  const emailUserId = emailUser.rows[0]?.id;
  const adminId = adminUser.rows[0]?.id;
  
  if (emailUserId && adminId && emailUserId !== adminId) {
    // Check if the email user is a patient with no appointments
    const emailUserAppts = await pool.query('SELECT COUNT(*) FROM appointments a JOIN patients p ON p.id=a.patient_id WHERE p.user_id=$1', [emailUserId]);
    if (parseInt(emailUserAppts.rows[0].count) === 0) {
      await pool.query('DELETE FROM patients WHERE user_id=$1', [emailUserId]);
      await pool.query('DELETE FROM users WHERE id=$1', [emailUserId]);
      console.log('Removed duplicate patient user');
      await pool.query("UPDATE users SET email='bhandarisaurabh500@gmail.com' WHERE id=$1", [adminId]);
      console.log('Admin email updated!');
    } else {
      console.log('Email user has appointments, keeping both. Admin email remains as-is.');
      // Just add email as secondary identifier - skip this
    }
  }

  // 2. Create notices table if not exists
  await pool.query(`
    CREATE TABLE IF NOT EXISTS notices (
      id SERIAL PRIMARY KEY,
      notice_text TEXT NOT NULL,
      is_active INTEGER DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('notices table created/verified');

  // 3. Seed sample notices
  const existing = await pool.query('SELECT COUNT(*) FROM notices');
  if (parseInt(existing.rows[0].count) === 0) {
    await pool.query(`INSERT INTO notices (notice_text) VALUES 
      ('OPD Timing: Mon-Sat 8:00 AM - 9:00 PM'),
      ('Cashless insurance facility available for all major insurance companies.'),
      ('Free Eye Checkup Camp every first Sunday of the month.')
    `);
    console.log('Sample notices inserted');
  }

  // 4. Update gallery with better Marathi+English titles
  const galleryUpdates = [
    { id: 1, title: 'ऑपरेशन थिएटर (Operation Theatre)', description: '3 Modular OTs with Laminar Airflow — Zero Infection Protocol', category: 'Operation Theatre' },
    { id: 2, title: 'सल्लामसलत कक्ष (Consultation Room)', description: '10 Well-Equipped OPD Consultation Rooms with Advanced Equipment', category: 'Facilities' },
    { id: 3, title: 'रुग्ण वार्ड (Hospital Ward)', description: 'Super Deluxe & Deluxe AC Patient Rooms with All Amenities', category: 'Facilities' },
    { id: 4, title: 'LASIK लेझर मशीन', description: 'Schwind Amaris 750S — German Technology for Bladeless LASIK', category: 'Equipment' },
    { id: 5, title: 'निदान उपकरणे (Diagnostic Equipment)', description: 'IOL Master 700, OCT, Corneal Topography & Advanced Diagnostic Tools', category: 'Equipment' },
  ];

  for (const item of galleryUpdates) {
    await pool.query(
      'UPDATE gallery SET title=$1, description=$2, category=$3 WHERE id=$4',
      [item.title, item.description, item.category, item.id]
    );
  }
  console.log('Gallery updated with Marathi+English titles!');

  process.exit();
}

fixAll().catch(e => { console.error(e.message); process.exit(1); });
