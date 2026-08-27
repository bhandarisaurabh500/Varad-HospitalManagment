require('dotenv').config();
const { pool } = require('./src/config/db');

async function createTable() {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS partial_leads (
        id SERIAL PRIMARY KEY,
        patient_name VARCHAR(255),
        phone VARCHAR(20) NOT NULL,
        email VARCHAR(255),
        form_data JSONB,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await pool.query(query);
    console.log('Successfully created partial_leads table.');
  } catch (err) {
    console.error('Error creating partial_leads table:', err);
  } finally {
    process.exit(0);
  }
}

createTable();
