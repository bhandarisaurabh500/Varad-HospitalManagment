const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function createSettingsTable() {
  try {
    console.log('Creating clinic_settings table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS clinic_settings (
        id INTEGER PRIMARY KEY DEFAULT 1,
        appointment_mobile VARCHAR(50) NOT NULL,
        clinic_phone VARCHAR(100) NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CHECK (id = 1)
      );
    `);
    
    console.log('Table created successfully.');

    // Insert default data if empty
    const { rows } = await pool.query('SELECT COUNT(*) FROM clinic_settings');
    if (parseInt(rows[0].count) === 0) {
      console.log('Inserting default clinic settings...');
      
      await pool.query(
        `INSERT INTO clinic_settings (id, appointment_mobile, clinic_phone) 
         VALUES (1, '+91 9923890890', '(0241) 2324680 / 2415600')`
      );
      console.log('Default settings inserted.');
    } else {
        // Force update to correct numbers just in case it exists with wrong numbers
        await pool.query(
            `UPDATE clinic_settings SET appointment_mobile = '+91 9923890890', clinic_phone = '(0241) 2324680 / 2415600' WHERE id = 1`
        );
        console.log('Existing settings updated.');
    }
  } catch (error) {
    console.error('Error creating table:', error);
  } finally {
    pool.end();
  }
}

createSettingsTable();
