const { pool } = require('../config/db');
const { isSlotBooked, generateAppointmentNo } = require('../services/appointmentService');
const emailService = require('../services/emailService');

/** POST /api/appointments - Patient books appointment */
async function createAppointment(req, res, next) {
  try {
    const {
      doctor_id, service_id, appointment_date, appointment_time,
      symptoms, age, gender, patient_name, patient_email, patient_phone
    } = req.body;

    if (!doctor_id || !appointment_date || !appointment_time) {
      return res.status(422).json({ success: false, message: 'doctor_id, appointment_date, appointment_time are required.' });
    }

    if (!patient_name || !patient_email || !patient_phone) {
      return res.status(422).json({ success: false, message: 'Patient name, email, and phone are required.' });
    }

    let patientId = null;

    // 1. Get PATIENT role id
    const [roles] = await pool.execute("SELECT id FROM roles WHERE name='PATIENT'");
    const roleId = roles.length ? roles[0].id : 3;

    // 2. Check if user exists by phone or email
    let [users] = await pool.execute('SELECT id FROM users WHERE phone=? OR email=?', [patient_phone, patient_email]);
    
    let userId;
    if (users.length > 0) {
      userId = users[0].id;
    } else {
      const [result] = await pool.execute(
        'INSERT INTO users (role_id, full_name, email, phone, password, is_active) VALUES (?, ?, ?, ?, ?, 1)',
        [roleId, patient_name, patient_email, patient_phone, 'guest_password']
      );
      userId = result.insertId || result.rows?.[0]?.id || (await pool.execute('SELECT LASTVAL() AS id'))[0][0].id;
    }

    // 3. Get or create patient record
    let [patients] = await pool.execute('SELECT id FROM patients WHERE user_id=?', [userId]);
    if (patients.length > 0) {
      patientId = patients[0].id;
    } else {
      const [result] = await pool.execute(
        'INSERT INTO patients (user_id, age, gender) VALUES (?, ?, ?)',
        [userId, age || null, gender || null]
      );
      patientId = result.insertId || result.rows?.[0]?.id || (await pool.execute('SELECT LASTVAL() AS id'))[0][0].id;
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

    // Send emails asynchronously (don't await them so we don't delay the response)
    // We wrap in a try-catch to prevent email failure from affecting the appointment booking
    setImmediate(async () => {
      try {
        await emailService.sendDoctorNotification(appointmentDetails);
        await emailService.sendPatientConfirmation(appointmentDetails);
      } catch (emailErr) {
        console.error('Email sending failed after successful appointment creation:', emailErr);
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
      `SELECT a.*, u_pat.full_name AS patient_name, u_pat.email AS patient_email,
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
      [status, notes || null, cancelled_reason || null, req.user.id, req.params.id]
    );
    return res.json({ success: true, message: `Appointment ${status.toLowerCase()}.` });
  } catch (err) {
    next(err);
  }
}

/** PUT /api/appointments/:id/reschedule */
async function rescheduleAppointment(req, res, next) {
  try {
    const { appointment_date, appointment_time, doctor_id } = req.body;
    if (!appointment_date || !appointment_time) {
      return res.status(422).json({ success: false, message: 'New date and time are required.' });
    }

    // Check existing appointment
    const [appt] = await pool.execute('SELECT doctor_id FROM appointments WHERE id=?', [req.params.id]);
    if (!appt.length) return res.status(404).json({ success: false, message: 'Appointment not found.' });

    const effectiveDoctorId = doctor_id || appt[0].doctor_id;
    const booked = await isSlotBooked(effectiveDoctorId, appointment_date, appointment_time, req.params.id);
    if (booked) {
      return res.status(409).json({
        success: false,
        message: 'This time slot is already booked. Please choose another time.',
      });
    }

    await pool.execute(
      'UPDATE appointments SET appointment_date=?, appointment_time=?, status="RESCHEDULED" WHERE id=?',
      [appointment_date, appointment_time, req.params.id]
    );
    return res.json({ success: true, message: 'Appointment rescheduled.' });
  } catch (err) {
    next(err);
  }
}

/** DELETE /api/appointments/:id - Cancel */
async function cancelAppointment(req, res, next) {
  try {
    const { reason } = req.body;
    await pool.execute(
      'UPDATE appointments SET status="CANCELLED", cancelled_reason=? WHERE id=?',
      [reason || null, req.params.id]
    );
    return res.json({ success: true, message: 'Appointment cancelled.' });
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

    const slots = allSlots.map(s => ({ time: s, available: !bookedSet.has(s) }));
    return res.json({ success: true, data: slots });
  } catch (err) {
    next(err);
  }
}

module.exports = { createAppointment, getAppointments, getAppointmentById, updateStatus, rescheduleAppointment, cancelAppointment, getAvailableSlots };
