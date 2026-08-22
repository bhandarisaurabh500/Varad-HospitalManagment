require('dotenv').config();
const { pool } = require('./src/config/db');

async function seedInsurance() {
  const client = await pool.getConnection();
  try {
    await client.query('BEGIN');
    
    // Insert Providers
    const providers = [
      ['Star Health Insurance', 'claims@starhealth.in', '1800-425-2255'],
      ['HDFC Ergo', 'care@hdfcergo.com', '1800-2700-700'],
      ['Bajaj Allianz', 'customercare@bajajallianz.co.in', '1800-209-5858']
    ];
    
    for (let p of providers) {
      await client.execute('INSERT INTO tpa_providers (provider_name, contact_email, contact_phone) VALUES (?, ?, ?)', p);
    }
    console.log('Inserted Providers');

    // Link patient 7 to Star Health
    await client.execute(
      'INSERT INTO tpa_patient_insurance (patient_id, provider_id, policy_number, expiry_date) VALUES (?, ?, ?, ?)',
      [7, 1, 'STAR-2026-987654321', '2028-01-01']
    );
    console.log('Inserted Patient Policy');

    // Create a claim for patient 7
    await client.execute(
      `INSERT INTO tpa_claims (claim_uid, patient_id, provider_id, appointment_id, amount_claimed, claim_date, notes) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      ['CLM-TEST-99991', 7, 1, null, 15000.00, '2026-08-20', 'Cataract Surgery Advance']
    );
    console.log('Inserted Claim');

    await client.query('COMMIT');
    console.log("Insurance seed data inserted successfully.");
  } catch (err) {
    await client.query('ROLLBACK');
    console.error("Failed to seed insurance data:", err);
  } finally {
    client.release();
    process.exit(0);
  }
}

seedInsurance();
