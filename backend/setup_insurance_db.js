require('dotenv').config();
const { pool } = require('./src/config/db');

async function setupInsuranceDb() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    // 1. Create tpa_providers
    await client.query(`
      CREATE TABLE IF NOT EXISTS tpa_providers (
        id SERIAL PRIMARY KEY,
        provider_name VARCHAR(255) NOT NULL,
        contact_email VARCHAR(255),
        contact_phone VARCHAR(50),
        status VARCHAR(20) DEFAULT 'ACTIVE',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 2. Create tpa_patient_insurance
    await client.query(`
      CREATE TABLE IF NOT EXISTS tpa_patient_insurance (
        id SERIAL PRIMARY KEY,
        patient_id INT NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
        provider_id INT NOT NULL REFERENCES tpa_providers(id) ON DELETE RESTRICT,
        policy_number VARCHAR(100) NOT NULL,
        expiry_date DATE NOT NULL,
        status VARCHAR(20) DEFAULT 'ACTIVE',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(patient_id, provider_id)
      )
    `);

    // 3. Create tpa_claims
    await client.query(`
      CREATE TABLE IF NOT EXISTS tpa_claims (
        id SERIAL PRIMARY KEY,
        claim_uid VARCHAR(50) UNIQUE NOT NULL,
        patient_id INT NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
        provider_id INT NOT NULL REFERENCES tpa_providers(id) ON DELETE RESTRICT,
        appointment_id INT REFERENCES appointments(id) ON DELETE SET NULL,
        amount_claimed DECIMAL(10,2) NOT NULL,
        amount_approved DECIMAL(10,2) DEFAULT 0.00,
        status VARCHAR(20) DEFAULT 'PENDING',
        claim_date DATE NOT NULL,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await client.query('COMMIT');
    console.log("Insurance tables created successfully.");
  } catch (err) {
    await client.query('ROLLBACK');
    console.error("Failed to create insurance tables:", err);
  } finally {
    client.release();
    process.exit(0);
  }
}

setupInsuranceDb();
