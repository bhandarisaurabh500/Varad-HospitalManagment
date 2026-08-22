const { pool } = require('./src/config/db');

async function runMigration() {
  console.log('Starting EMR Migration...');
  
  try {
    // 1. Add patient_uid to patients
    console.log('Migrating patients table...');
    await pool.query(`
      ALTER TABLE patients 
      ADD COLUMN IF NOT EXISTS patient_uid VARCHAR(50) UNIQUE;
    `);

    // Assign VH-YYYY-XXXXXX to existing patients
    const { rows: patients } = await pool.query(`SELECT id FROM patients WHERE patient_uid IS NULL`);
    const year = new Date().getFullYear();
    for (let i = 0; i < patients.length; i++) {
      const pId = patients[i].id;
      const uid = `VH-${year}-${String(pId).padStart(6, '0')}`;
      await pool.query(`UPDATE patients SET patient_uid = $1 WHERE id = $2`, [uid, pId]);
    }

    // 2. Add columns to medical_records (acting as visits)
    console.log('Migrating medical_records table...');
    await pool.query(`
      ALTER TABLE medical_records 
      ADD COLUMN IF NOT EXISTS visit_uid VARCHAR(50) UNIQUE,
      ADD COLUMN IF NOT EXISTS visit_status VARCHAR(50) DEFAULT 'COMPLETED',
      ADD COLUMN IF NOT EXISTS chief_complaint TEXT,
      ADD COLUMN IF NOT EXISTS advice TEXT;
    `);

    // 3. Rename old prescriptions to prescription_items
    console.log('Migrating prescriptions table...');
    
    // Check if table exists before renaming
    const { rows: tableExists } = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'prescriptions'
      );
    `);
    
    if (tableExists[0].exists) {
      await pool.query(`ALTER TABLE prescriptions RENAME TO prescription_items;`);
      // Rename medical_record_id to prescription_id in prescription_items (we'll assume medical_record_id becomes prescription_id for simplicity, but actually prescription_items belongs to a prescription header).
      // Wait, we need to create prescription header first.
    }

    // 4. Create prescriptions header table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS prescriptions (
        id SERIAL PRIMARY KEY,
        prescription_uid VARCHAR(50) UNIQUE NOT NULL,
        patient_id INT NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
        visit_id INT NOT NULL REFERENCES medical_records(id) ON DELETE CASCADE,
        doctor_id INT NOT NULL REFERENCES doctors(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 5. Alter prescription_items to link to prescriptions instead of medical_records
    const { rows: itemCols } = await pool.query(`
      SELECT column_name FROM information_schema.columns 
      WHERE table_name = 'prescription_items' AND column_name = 'prescription_id'
    `);
    
    if (itemCols.length === 0) {
      await pool.query(`
        ALTER TABLE prescription_items 
        ADD COLUMN prescription_id INT REFERENCES prescriptions(id) ON DELETE CASCADE;
      `);
      
      // Migrate old data: Create a prescription header for each distinct medical_record_id in prescription_items
      const { rows: oldRecords } = await pool.query(`
        SELECT DISTINCT medical_record_id FROM prescription_items WHERE prescription_id IS NULL
      `);
      
      for (const rec of oldRecords) {
        // Get patient_id and doctor_id from medical_record
        const { rows: mr } = await pool.query(`SELECT patient_id, doctor_id FROM medical_records WHERE id = $1`, [rec.medical_record_id]);
        if (mr.length > 0) {
          const uid = `RX-${year}-${String(Date.now()).slice(-6)}-${rec.medical_record_id}`;
          const insertRes = await pool.query(`
            INSERT INTO prescriptions (prescription_uid, patient_id, visit_id, doctor_id) 
            VALUES ($1, $2, $3, $4) RETURNING id
          `, [uid, mr[0].patient_id, rec.medical_record_id, mr[0].doctor_id]);
          
          const newRxId = insertRes.rows[0].id;
          await pool.query(`UPDATE prescription_items SET prescription_id = $1 WHERE medical_record_id = $2`, [newRxId, rec.medical_record_id]);
        }
      }
      
      // Drop medical_record_id from prescription_items
      await pool.query(`ALTER TABLE prescription_items DROP COLUMN medical_record_id;`);
    }

    // 6. Create medicine_master
    console.log('Creating medicine_master table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS medicine_master (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        generic_name VARCHAR(255),
        brand_name VARCHAR(255),
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    // Seed some common eye drops
    await pool.query(`
      INSERT INTO medicine_master (name, generic_name, is_active)
      VALUES 
        ('Moxifloxacin Eye Drops (0.5%)', 'Moxifloxacin', true),
        ('Tobramycin Eye Drops (0.3%)', 'Tobramycin', true),
        ('Refresh Tears (0.5%)', 'Carboxymethylcellulose', true),
        ('Systane Ultra', 'Polyethylene Glycol', true),
        ('Nepafenac Eye Drops (0.1%)', 'Nepafenac', true),
        ('Prednisolone Acetate (1%)', 'Prednisolone', true)
      ON CONFLICT (name) DO NOTHING;
    `);

    console.log('Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

runMigration();
