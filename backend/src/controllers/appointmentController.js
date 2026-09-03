const { pool } = require('../config/db');
const { isSlotBooked, generateAppointmentNo } = require('../services/appointmentService');
const emailService = require('../services/emailService');
const whatsappService = require('../services/whatsappService');

/** POST /api/appointments - Patient books appointment */
async function createAppointment(req, res, next) {
  try {
    const {
      doctor_id, service_id, appointment_date, appointment_time,
      symptoms, age, patient_name, patient_email, patient_phone,
      patient_uid, blood_group
    } = req.body;

    // Normalize gender to UPPERCASE to match DB CHECK constraint ('MALE','FEMALE','OTHER')
    const gender = req.body.gender ? req.body.gender.toUpperCase() : null;

    if (!doctor_id || !appointment_date || !appointment_time) {
      return res.status(422).json({ success: false, message: 'doctor_id, appointment_date, appointment_time are required.' });
    }

    if (!patient_name || !patient_email || !patient_phone) {
      return res.status(422).json({ success: false, message: 'Patient name, email, and phone are required.' });
    }

    let patientId = null;

    // 1. Always search by phone first (most reliable unique identifier)
    let existingByPhone = [];
    if (patient_uid) {
      const [rows] = await pool.execute(
        'SELECT p.id, u.id as user_id FROM patients p JOIN users u ON p.user_id = u.id WHERE u.phone = ? OR p.patient_uid = ?',
        [patient_phone, patient_uid]
      );
      existingByPhone = rows;
    } else {
      const [rows] = await pool.execute(
        'SELECT p.id, u.id as user_id FROM patients p JOIN users u ON p.user_id = u.id WHERE u.phone = ?',
        [patient_phone]
      );
      existingByPhone = rows;
    }

    // 2. If not found by phone, try by email (only if it's a real email)
    let existingPatients = existingByPhone;
    if (existingPatients.length === 0 && patient_email && !patient_email.includes('@noemail.com')) {
      const [rowsByEmail] = await pool.execute(
        'SELECT p.id, u.id as user_id FROM patients p JOIN users u ON p.user_id = u.id WHERE u.email = ?',
        [patient_email]
      );
      existingPatients = rowsByEmail;
    }

    let userId;
    if (existingPatients.length > 0) {
      // Returning Patient found
      patientId = existingPatients[0].id;
      userId = existingPatients[0].user_id;
      
      // Update contact_email and/or blood_group if provided
      let updates = [];
      let params = [];
      if (patient_email && !patient_email.includes('@noemail.com')) {
        updates.push('contact_email = ?');
        params.push(patient_email);
      }
      if (blood_group) {
        updates.push('blood_group = ?');
        params.push(blood_group);
      }
      if (updates.length > 0) {
        params.push(patientId);
        await pool.execute(`UPDATE patients SET ${updates.join(', ')} WHERE id = ?`, params);
      }
    } else {
      // New Patient
      // 1. Get PATIENT role id
      const [roles] = await pool.execute("SELECT id FROM roles WHERE name='PATIENT'");
      const roleId = roles.length ? roles[0].id : 3;

      // Use a safe email — if email already exists in DB, use phone-based fallback
      let safeEmail = patient_email && !patient_email.includes('@noemail.com') ? patient_email : `${patient_phone}@noemail.com`;

      // Check if email is already taken by another user
      const [emailCheck] = await pool.execute('SELECT id FROM users WHERE email = ?', [safeEmail]);
      if (emailCheck.length > 0) {
        // Email taken — use phone-based unique email
        safeEmail = `${patient_phone}_${Date.now()}@noemail.com`;
      }

      const [userResult] = await pool.execute(
        'INSERT INTO users (role_id, full_name, email, phone, password, is_active) VALUES (?, ?, ?, ?, ?, 1)',
        [roleId, patient_name, safeEmail, patient_phone, 'guest_password']
      );
      userId = userResult.insertId;

      // Generate new UHID VH-YYYY-XXXXXX
      const year = new Date().getFullYear();
      const randomSuffix = String(Math.floor(Math.random() * 1000000)).padStart(6, '0');
      const newUid = `VH-${year}-${randomSuffix}`; // Temporary uid to insert

      const [patientResult] = await pool.execute(
        'INSERT INTO patients (user_id, age, gender, blood_group, patient_uid, contact_email) VALUES (?, ?, ?, ?, ?, ?)',
        [userId, age || null, gender || null, blood_group || null, newUid, patient_email && !patient_email.includes('@noemail.com') ? patient_email : null]
      );
      patientId = patientResult.insertId;

      // Now update the UHID cleanly with the actual patientId
      const finalUid = `VH-${year}-${String(patientId).padStart(6, '0')}`;
      await pool.execute('UPDATE patients SET patient_uid = ? WHERE id = ?', [finalUid, patientId]);
    }

    // Check double-booking
    const booked = await isSlotBooked(doctor_id, appointment_date, appointment_time);
    if (booked) {
      return res.status(409).json({
        success: false,
        message: 'This time slot is already booked. Please choose another time.',
      });
    }

    const appointmentNo = await generateAppointmentNo();

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

    // Remove from partial_leads (incomplete bookings) since it is now successfully booked
    try {
      await pool.execute('DELETE FROM partial_leads WHERE phone = ?', [patient_phone]);
    } catch (err) {
      console.error('Failed to remove partial lead:', err);
    }

    // Prepare details for emails
    const appointmentDetails = {
      appointment_no: appointmentNo,
      patient_name,
      patient_phone,
      patient_email,
      age,
      gender,
      appointment_date,
      appointment_time,
      symptoms,
      created_at: new Date().toISOString()
    };

    // Send emails and WhatsApp asynchronously
    setImmediate(async () => {
      try {
        await emailService.sendDoctorNotification(appointmentDetails);
        await emailService.sendPatientConfirmation(appointmentDetails);
      } catch (notifyErr) {
        console.error('Email notification failed after successful appointment creation:', notifyErr);
      }
      try {
        await whatsappService.sendPatientWhatsAppConfirmation(appointmentDetails);
      } catch (waErr) {
        console.error('WhatsApp notification failed after successful appointment creation:', waErr);
      }
    });

    return res.status(201).json({
      success: true,
      message: 'Appointment booked successfully.',
      data: { appointment_no: appointmentNo },
    });
  } catch (err) {
    next(err);
  }
}

/** GET /api/appointments - Admin sees all, Doctor sees own, Patient sees own */
async function getAppointments(req, res, next) {
  try {
    const { role, id: userId, roleId } = req.user;
    let query = `
      SELECT a.id, a.appointment_no, a.appointment_date, a.appointment_time, a.status,
             a.symptoms, a.age, a.gender, a.created_at,
             u_pat.full_name AS patient_name, u_pat.phone AS patient_phone,
             u_doc.full_name AS doctor_name,
             s.name AS service_name
      FROM appointments a
      JOIN patients pt ON pt.id = a.patient_id
      JOIN users u_pat ON u_pat.id = pt.user_id
      JOIN doctors d ON d.id = a.doctor_id
      JOIN users u_doc ON u_doc.id = d.user_id
      LEFT JOIN services s ON s.id = a.service_id
    `;
    const params = [];

    if (role === 'DOCTOR') {
      query += ' WHERE a.doctor_id=?';
      params.push(roleId);
    } else if (role === 'PATIENT') {
      query += ' WHERE a.patient_id=?';
      params.push(roleId);
    }

    query += ' ORDER BY a.appointment_date DESC, a.appointment_time DESC';

    const [rows] = await pool.execute(query, params);
    return res.json({ success: true, data: rows });
  } catch (err) {
    next(err);
  }
}

/** GET /api/appointments/:id */
async function getAppointmentById(req, res, next) {
  try {
    const [rows] = await pool.execute(
      `SELECT a.*, u_pat.full_name AS patient_name, COALESCE(NULLIF(pt.contact_email, ''), u_pat.email) AS patient_email,
              u_pat.phone AS patient_phone, u_doc.full_name AS doctor_name,
              s.name AS service_name
       FROM appointments a
       JOIN patients pt ON pt.id = a.patient_id
       JOIN users u_pat ON u_pat.id = pt.user_id
       JOIN doctors d ON d.id = a.doctor_id
       JOIN users u_doc ON u_doc.id = d.user_id
       LEFT JOIN services s ON s.id = a.service_id
       WHERE a.id = ?`,
      [req.params.id]
    );
    if (!rows.length) return res.status(404).json({ success: false, message: 'Appointment not found.' });
    return res.json({ success: true, data: rows[0] });
  } catch (err) {
    next(err);
  }
}

/** PUT /api/appointments/:id/status - Admin/Doctor update status */
async function updateStatus(req, res, next) {
  try {
    const { status, notes, cancelled_reason } = req.body;
    const allowed = ['PENDING','CONFIRMED','COMPLETED','CANCELLED','RESCHEDULED'];
    if (!allowed.includes(status)) {
      return res.status(422).json({ success: false, message: 'Invalid status.' });
    }
    await pool.execute(
      'UPDATE appointments SET status=?, notes=?, cancelled_reason=?, confirmed_by=? WHERE id=?',
      [status, notes || null, cancelled_reason || null, req.user ? req.user.id : null, req.params.id]
    );

    // Fetch appointment details to send the email and WhatsApp
    const [rows] = await pool.execute(
      `SELECT a.appointment_no, a.appointment_date, a.appointment_time, a.symptoms,
              u_pat.full_name AS patient_name, COALESCE(NULLIF(pt.contact_email, ''), u_pat.email) AS patient_email,
              u_pat.phone AS patient_phone
       FROM appointments a
       JOIN patients pt ON pt.id = a.patient_id
       JOIN users u_pat ON u_pat.id = pt.user_id
       WHERE a.id = ?`,
      [req.params.id]
    );

      if (rows.length > 0 && (status === 'PENDING' || status === 'CONFIRMED' || status === 'CANCELLED')) {
        const appointmentDetails = rows[0];
        setImmediate(async () => {
          try {
            await emailService.sendStatusUpdateEmail(appointmentDetails, status);
          } catch (notifyErr) {
            console.error('Failed to send status update notification email:', notifyErr);
          }
          try {
            const whatsappService = require('../services/whatsappService');
            await whatsappService.sendWhatsAppStatusUpdate(appointmentDetails, status);
          } catch (waErr) {
            console.error('Failed to send status update notification whatsapp:', waErr);
          }
        });
      }

    return res.json({ success: true, message: `Appointment ${status.toLowerCase()}.` });
  } catch (err) {
    next(err);
  }
}

/** PUT /api/appointments/:id/reschedule */
async function rescheduleAppointment(req, res, next) {
  try {
    const { appointment_date, appointment_time, doctor_id, symptoms, age, gender, service_id } = req.body;

    // Check existing appointment
    const [appt] = await pool.execute('SELECT * FROM appointments WHERE id=?', [req.params.id]);
    if (!appt.length) return res.status(404).json({ success: false, message: 'Appointment not found.' });

    const effectiveDoctorId = doctor_id || appt[0].doctor_id;
    const effDate = appointment_date || appt[0].appointment_date;
    const effTime = appointment_time || appt[0].appointment_time;

    // Only check double booking if date or time changed
    if (appointment_date || appointment_time) {
      const booked = await isSlotBooked(effectiveDoctorId, effDate, effTime, req.params.id);
      if (booked) {
        return res.status(409).json({
          success: false,
          message: 'This time slot is already booked. Please choose another time.',
        });
      }
    }

    const effSymptoms = symptoms !== undefined ? symptoms : appt[0].symptoms;
    const effAge = age !== undefined ? age : appt[0].age;
    const effGender = gender !== undefined ? gender : appt[0].gender;
    const effServiceId = service_id !== undefined ? service_id : appt[0].service_id;
    // Set status to RESCHEDULED only if date or time changed
    const newStatus = (appointment_date || appointment_time) ? 'RESCHEDULED' : appt[0].status;

    await pool.execute(
      'UPDATE appointments SET appointment_date=?, appointment_time=?, status=?, symptoms=?, age=?, gender=?, service_id=? WHERE id=?',
      [effDate, effTime, newStatus, effSymptoms, effAge, effGender, effServiceId, req.params.id]
    );

    // If it was actually rescheduled, send notifications
    if (newStatus === 'RESCHEDULED') {
      const [rows] = await pool.execute(
        `SELECT a.appointment_no, a.appointment_date, a.appointment_time, a.symptoms,
                u_pat.full_name AS patient_name, COALESCE(NULLIF(pt.contact_email, ''), u_pat.email) AS patient_email,
                u_pat.phone AS patient_phone
         FROM appointments a
         JOIN patients pt ON pt.id = a.patient_id
         JOIN users u_pat ON u_pat.id = pt.user_id
         WHERE a.id = ?`,
        [req.params.id]
      );

      if (rows.length > 0) {
        const appointmentDetails = rows[0];
        setImmediate(async () => {
          try {
            await emailService.sendStatusUpdateEmail(appointmentDetails, 'RESCHEDULED');
          } catch (notifyErr) {
            console.error('Failed to send reschedule email:', notifyErr);
          }
          try {
            const whatsappService = require('../services/whatsappService');
            await whatsappService.sendWhatsAppStatusUpdate(appointmentDetails, 'RESCHEDULED');
          } catch (waErr) {
            console.error('Failed to send reschedule whatsapp:', waErr);
          }
        });
      }
    }

    return res.json({ success: true, message: 'Appointment rescheduled.' });
  } catch (err) {
    next(err);
  }
}

/** DELETE /api/appointments/:id - Permanently delete appointment */
async function deleteAppointment(req, res, next) {
  try {
    await pool.execute('DELETE FROM appointments WHERE id=?', [req.params.id]);
    return res.json({ success: true, message: 'Appointment permanently deleted.' });
  } catch (err) {
    next(err);
  }
}

/** GET /api/appointments/slots - Available time slots for a doctor on a date */
async function getAvailableSlots(req, res, next) {
  try {
    const { doctor_id, date } = req.query;
    if (!doctor_id || !date) {
      return res.status(422).json({ success: false, message: 'doctor_id and date are required.' });
    }

    // All possible slots
    const allSlots = [
      '09:00','09:30','10:00','10:30','11:00','11:30',
      '12:00','14:00','14:30','15:00','15:30','16:00','16:30',
    ];

    // Booked slots
    const [booked] = await pool.execute(
      `SELECT TIME_FORMAT(appointment_time,'%H:%i') AS t
       FROM appointments
       WHERE doctor_id=? AND appointment_date=? AND status NOT IN ('CANCELLED','RESCHEDULED')`,
      [doctor_id, date]
    );
    const bookedSet = new Set(booked.map(r => r.t));

    const now = new Date();
    // Use local time formatted as YYYY-MM-DD
    const today = now.toLocaleDateString('en-CA'); // en-CA gives YYYY-MM-DD format based on local time
    const isToday = date === today;
    const currentTimeStr = now.toTimeString().substring(0, 5);

    const slots = allSlots.map(s => {
      const isPast = isToday && s <= currentTimeStr;
      return { time: s, available: !bookedSet.has(s) && !isPast };
    });
    return res.json({ success: true, data: slots });
  } catch (err) {
    next(err);
  }
}

module.exports = { createAppointment, getAppointments, getAppointmentById, updateStatus, rescheduleAppointment, deleteAppointment, getAvailableSlots };
