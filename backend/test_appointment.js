const { pool } = require('./src/config/db');

async function testCreate() {
  try {
    const payload = {
      doctor_id: 1,
      appointment_date: '2027-09-01',
      appointment_time: '10:00:00',
      patient_name: 'Navnath Jangale 2',
      patient_email: '1234567890@noemail.com',
      patient_phone: '1234567890',
      age: null,
      gender: 'MALE',
      symptoms: '-'
    };
    
    // Simulate what createAppointment does
    const { doctor_id, service_id, appointment_date, appointment_time, symptoms, age, patient_name, patient_email, patient_phone, patient_uid, gender } = payload;
    let patientId = null;

    let query = 'SELECT p.id, u.id as user_id FROM patients p JOIN users u ON p.user_id = u.id WHERE u.phone = ?';
    let params = [patient_phone];

    const [existingPatients] = await pool.execute(query, params);

    let userId;
    if (existingPatients.length > 0) {
      patientId = existingPatients[0].id;
      userId = existingPatients[0].user_id;
    } else {
      const [roles] = await pool.execute("SELECT id FROM roles WHERE name='PATIENT'");
      const roleId = roles.length ? roles[0].id : 3;

      const [userResult] = await pool.execute(
        'INSERT INTO users (role_id, full_name, email, phone, password, is_active) VALUES (?, ?, ?, ?, ?, 1)',
        [roleId, patient_name, patient_email, patient_phone, 'guest_password']
      );
      userId = userResult.insertId;

      const year = new Date().getFullYear();
      const randomSuffix = String(Math.floor(Math.random() * 1000000)).padStart(6, '0');
      const newUid = `VH-${year}-${randomSuffix}`;

      const [patientResult] = await pool.execute(
        'INSERT INTO patients (user_id, age, gender, patient_uid) VALUES (?, ?, ?, ?)',
        [userId, age || null, gender || null, newUid]
      );
      patientId = patientResult.insertId;

      const finalUid = `VH-${year}-${String(patientId).padStart(6, '0')}`;
      await pool.execute('UPDATE patients SET patient_uid = ? WHERE id = ?', [finalUid, patientId]);
    }
    
    const [existing] = await pool.execute(
      `SELECT id FROM appointments WHERE doctor_id=? AND appointment_date=? AND appointment_time=? AND status NOT IN ('CANCELLED','RESCHEDULED')`,
      [doctor_id, appointment_date, appointment_time]
    );

    if (existing.length > 0) {
        console.log('Slot already booked.');
    } else {
        const appointmentNo = 'A-' + Math.floor(Math.random()*1000);
        await pool.execute(
          `INSERT INTO appointments
             (appointment_no, patient_id, doctor_id, service_id, appointment_date, appointment_time, symptoms, age, gender)
           VALUES (?,?,?,?,?,?,?,?,?)`,
          [
            appointmentNo, patientId, doctor_id,
            service_id || null, appointment_date, appointment_time,
            symptoms || null, age || null, gender || null,
          ]
        );
        console.log('Inserted appointment');
    }

  } catch(e) {
    console.error('Error:', e);
  } finally {
    process.exit(0);
  }
}

testCreate();
