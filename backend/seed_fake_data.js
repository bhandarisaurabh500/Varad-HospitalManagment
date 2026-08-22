require('dotenv').config();
const { pool } = require('./src/config/db');

const FAKE_PATIENTS = [
  { name: 'Aditya Gayake', email: `aditya.g.${Date.now()}@gmail.com`, phone: '9876543211', age: 45, gender: 'MALE', symptoms: 'Blurry vision in left eye', service: 1 },
  { name: 'Priya Deshmukh', email: `priya.d.${Date.now()}@gmail.com`, phone: '8765432112', age: 32, gender: 'FEMALE', symptoms: 'Dry eyes and redness', service: 2 },
  { name: 'Rahul Joshi', email: `rahul.j.${Date.now()}@gmail.com`, phone: '7654321013', age: 60, gender: 'MALE', symptoms: 'Cataract evaluation needed', service: 3 },
  { name: 'Sneha Kulkarni', email: `sneha.k.${Date.now()}@gmail.com`, phone: '6543210914', age: 28, gender: 'FEMALE', symptoms: 'Lasik consultation', service: 4 },
  { name: 'Vijay Patil', email: `vijay.p.${Date.now()}@gmail.com`, phone: '5432109815', age: 55, gender: 'MALE', symptoms: 'Glaucoma regular checkup', service: 5 },
];

async function seedFakeData() {
  try {
    console.log("Starting to seed fake data...");

    // Get roles
    const [roles] = await pool.execute("SELECT id FROM roles WHERE name='PATIENT'");
    const patientRoleId = roles.length ? roles[0].id : 3;

    let apptNoStart = 10;
    
    for (let i = 0; i < FAKE_PATIENTS.length; i++) {
      const p = FAKE_PATIENTS[i];
      
      // 1. Create User
      const [userResult] = await pool.execute(
        'INSERT INTO users (role_id, full_name, email, phone, password, is_active) VALUES (?, ?, ?, ?, ?, 1)',
        [patientRoleId, p.name, p.email, p.phone, 'password123']
      );
      const userId = userResult.insertId;

      const ts = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
      // 2. Create Patient
      const patientUid = `VH-2026-F${ts}`;
      const [patientResult] = await pool.execute(
        'INSERT INTO patients (user_id, age, gender, patient_uid) VALUES (?, ?, ?, ?)',
        [userId, p.age, p.gender, patientUid]
      );
      const patientId = patientResult.insertId;

      // 3. Create Appointment
      const apptNo = `APT-2026-F${ts}`;
      const [apptResult] = await pool.execute(
        `INSERT INTO appointments 
         (appointment_no, patient_id, doctor_id, service_id, appointment_date, appointment_time, symptoms, status) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [apptNo, patientId, 1, p.service, '2026-08-25', '10:00:00', p.symptoms, 'COMPLETED']
      );
      const appointmentId = apptResult.insertId;

      // Create a Visit (medical_record)
      const visitUid = `VIS-2026-F${ts}`;
      const [visitResult] = await pool.execute(
        `INSERT INTO medical_records (visit_uid, appointment_id, patient_id, doctor_id, visit_date, symptoms, diagnosis, advice, visit_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [visitUid, appointmentId, patientId, 1, '2026-08-25', p.symptoms, 'Routine Evaluation', 'Patient advised to take rest and use prescribed eye drops.', 'COMPLETED']
      );
      const visitId = visitResult.insertId;

      // 4. Create Prescription
      const prescUid = `PRX-2026-F${ts}`;
      const [prescResult] = await pool.execute(
        `INSERT INTO prescriptions (prescription_uid, visit_id, patient_id, doctor_id) VALUES (?, ?, ?, ?)`,
        [prescUid, visitId, patientId, 1]
      );
      const prescriptionId = prescResult.insertId;

      // 5. Create Medicines (2-3 per prescription)
      await pool.execute(
        `INSERT INTO prescription_items (prescription_id, medicine_name, dosage, duration, instructions) VALUES (?, ?, ?, ?, ?)`,
        [prescriptionId, 'Refresh Tears Eye Drops', '1 drop twice a day', '15 Days', 'Use before sleeping']
      );
      
      await pool.execute(
        `INSERT INTO prescription_items (prescription_id, medicine_name, dosage, duration, instructions) VALUES (?, ?, ?, ?, ?)`,
        [prescriptionId, 'Moxicip Eye Drops', '1 drop thrice a day', '7 Days', 'Keep eyes closed for 2 mins after applying']
      );

      console.log(`Successfully added fake data for ${p.name}`);
    }

    console.log("Fake data seeding complete!");
  } catch (err) {
    console.error("Error seeding data:", err);
  } finally {
    process.exit(0);
  }
}

seedFakeData();
