const nodemailer = require('nodemailer');

// Create a transporter using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const DOCTOR_EMAIL = process.env.DOCTOR_EMAIL || process.env.EMAIL_USER;

/**
 * Send an email notification to the doctor for a new appointment request
 */
async function sendDoctorNotification(appointmentDetails) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('EMAIL_USER or EMAIL_PASS is not set. Skipping doctor notification email.');
    return;
  }

  const {
    appointment_no,
    patient_name,
    patient_phone,
    patient_email,
    age,
    gender,
    appointment_date,
    appointment_time,
    symptoms,
    created_at
  } = appointmentDetails;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #0f172a; padding: 20px; text-align: center;">
        <h2 style="color: #ffffff; margin: 0; font-size: 20px;">NEW APPOINTMENT REQUEST</h2>
      </div>
      
      <div style="padding: 30px; background-color: #ffffff;">
        <p style="color: #475569; font-size: 16px; line-height: 1.5; margin-top: 0;">
          A new appointment request has been received through the official doctor website.
        </p>
        
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; width: 40%; font-size: 14px;">Appointment ID:</td>
              <td style="padding: 8px 0; color: #0f172a; font-weight: bold; font-family: monospace; font-size: 14px;">${appointment_no}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Patient Name:</td>
              <td style="padding: 8px 0; color: #0f172a; font-weight: bold; font-size: 14px;">${patient_name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Mobile:</td>
              <td style="padding: 8px 0; color: #0f172a; font-weight: bold; font-size: 14px;">${patient_phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Email:</td>
              <td style="padding: 8px 0; color: #0f172a; font-weight: bold; font-size: 14px;">${patient_email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Age / Gender:</td>
              <td style="padding: 8px 0; color: #0f172a; font-weight: bold; font-size: 14px;">${age || '-'} / ${gender || '-'}</td>
            </tr>
            <tr><td colspan="2"><hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 10px 0;" /></td></tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Date:</td>
              <td style="padding: 8px 0; color: #0369a1; font-weight: bold; font-size: 14px;">${new Date(appointment_date).toLocaleDateString()}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Time:</td>
              <td style="padding: 8px 0; color: #0369a1; font-weight: bold; font-size: 14px;">${appointment_time}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Reason:</td>
              <td style="padding: 8px 0; color: #0f172a; font-size: 14px;">${symptoms || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Status:</td>
              <td style="padding: 8px 0; font-size: 14px;">
                <span style="background-color: #ffedd5; color: #c2410c; padding: 4px 8px; border-radius: 4px; font-weight: bold; font-size: 12px;">PENDING</span>
              </td>
            </tr>
          </table>
        </div>
        
        <p style="color: #94a3b8; font-size: 12px; margin-bottom: 20px;">
          Booked On: ${new Date(created_at || Date.now()).toLocaleString()}
        </p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="http://localhost:5173/admin/appointments" style="background-color: #0284c7; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 15px; display: inline-block;">
            View Appointment in Dashboard
          </a>
        </div>
      </div>
      
      <div style="background-color: #f1f5f9; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
        <p style="margin: 0; color: #0f172a; font-weight: bold; font-size: 14px;">Dr. Raosaheb K. Borude</p>
        <p style="margin: 4px 0 0 0; color: #64748b; font-size: 13px;">Ophthalmologist | Cataract, Glaucoma & Refractive Surgeon</p>
      </div>
    </div>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"Varad Netralaya" <${process.env.EMAIL_USER}>`,
      to: DOCTOR_EMAIL,
      subject: `New Appointment Request \u2014 Dr. Raosaheb K. Borude`,
      html: html,
    });
    console.log('Doctor notification email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Failed to send doctor notification:', error);
    throw error;
  }
}

/**
 * Send a confirmation email to the patient
 */
async function sendPatientConfirmation(appointmentDetails) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('EMAIL_USER or EMAIL_PASS is not set. Skipping patient confirmation email.');
    return;
  }

  const {
    appointment_no,
    patient_name,
    patient_email,
    appointment_date,
    appointment_time,
    symptoms
  } = appointmentDetails;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #0f172a; padding: 20px; text-align: center;">
        <h2 style="color: #ffffff; margin: 0; font-size: 20px;">Appointment Request Received</h2>
      </div>
      
      <div style="padding: 30px; background-color: #ffffff;">
        <p style="color: #475569; font-size: 16px; line-height: 1.5; margin-top: 0;">
          Dear <strong>${patient_name}</strong>,
        </p>
        <p style="color: #475569; font-size: 16px; line-height: 1.5;">
          Your appointment request has been received and is currently awaiting confirmation.
        </p>
        
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; width: 40%; font-size: 14px;">Appointment ID:</td>
              <td style="padding: 8px 0; color: #0f172a; font-weight: bold; font-family: monospace; font-size: 14px;">${appointment_no}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Doctor:</td>
              <td style="padding: 8px 0; color: #0f172a; font-weight: bold; font-size: 14px;">Dr. Raosaheb K. Borude</td>
            </tr>
            <tr><td colspan="2"><hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 10px 0;" /></td></tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Date:</td>
              <td style="padding: 8px 0; color: #0369a1; font-weight: bold; font-size: 14px;">${new Date(appointment_date).toLocaleDateString()}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Time:</td>
              <td style="padding: 8px 0; color: #0369a1; font-weight: bold; font-size: 14px;">${appointment_time}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Reason:</td>
              <td style="padding: 8px 0; color: #0f172a; font-size: 14px;">${symptoms || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Status:</td>
              <td style="padding: 8px 0; font-size: 14px;">
                <span style="background-color: #ffedd5; color: #c2410c; padding: 4px 8px; border-radius: 4px; font-weight: bold; font-size: 12px;">PENDING</span>
              </td>
            </tr>
          </table>
        </div>
        
        <p style="color: #475569; font-size: 14px; line-height: 1.5; margin-bottom: 0;">
          Our hospital staff will review your request and confirm the appointment shortly. 
          If you have any questions, please contact us.
        </p>
      </div>
      
      <div style="background-color: #f1f5f9; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
        <p style="margin: 0; color: #0f172a; font-weight: bold; font-size: 14px;">Dr. Raosaheb K. Borude</p>
        <p style="margin: 4px 0 0 0; color: #64748b; font-size: 13px;">Ophthalmologist | Cataract, Glaucoma & Refractive Surgeon</p>
      </div>
    </div>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"Varad Netralaya" <${process.env.EMAIL_USER}>`,
      to: patient_email,
      subject: `Appointment Request Received \u2014 Dr. Raosaheb K. Borude`,
      html: html,
    });
    console.log('Patient confirmation email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Failed to send patient confirmation:', error);
    throw error;
  }
}

/**
 * Send an email notification to the patient when their appointment status changes
 */
async function sendStatusUpdateEmail(appointmentDetails, newStatus) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('EMAIL_USER or EMAIL_PASS is not set. Skipping status update email.');
    return;
  }

  const {
    appointment_no,
    patient_name,
    patient_email,
    appointment_date,
    appointment_time,
    symptoms
  } = appointmentDetails;

  // Determine status color and user-friendly message
  let statusColor = '#475569';
  let bgColor = '#f1f5f9';
  let statusText = newStatus;
  let customMessage = '';

  if (newStatus === 'CONFIRMED') {
    statusColor = '#15803d'; // Green
    bgColor = '#dcfce7';
    statusText = 'APPROVED';
    customMessage = 'Your appointment has been approved. Please arrive 10 minutes early.';
  } else if (newStatus === 'CANCELLED') {
    statusColor = '#b91c1c'; // Red
    bgColor = '#fee2e2';
    statusText = 'REJECTED / CANCELLED';
    customMessage = 'We apologize, but your appointment request could not be fulfilled at this time.';
  } else if (newStatus === 'PENDING') {
    statusColor = '#c2410c'; // Orange
    bgColor = '#ffedd5';
    statusText = 'PENDING';
    customMessage = 'Your appointment is currently pending confirmation from our staff.';
  }

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #0f172a; padding: 20px; text-align: center;">
        <h2 style="color: #ffffff; margin: 0; font-size: 20px;">Appointment Status Update</h2>
      </div>
      
      <div style="padding: 30px; background-color: #ffffff;">
        <p style="color: #475569; font-size: 16px; line-height: 1.5; margin-top: 0;">
          Dear <strong>${patient_name}</strong>,
        </p>
        <p style="color: #475569; font-size: 16px; line-height: 1.5;">
          There is an update regarding your appointment at Varad Netralaya.
        </p>
        <p style="color: ${statusColor}; font-weight: bold; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
          ${customMessage}
        </p>
        
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; width: 40%; font-size: 14px;">Appointment ID:</td>
              <td style="padding: 8px 0; color: #0f172a; font-weight: bold; font-family: monospace; font-size: 14px;">${appointment_no}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Doctor:</td>
              <td style="padding: 8px 0; color: #0f172a; font-weight: bold; font-size: 14px;">Dr. Raosaheb K. Borude</td>
            </tr>
            <tr><td colspan="2"><hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 10px 0;" /></td></tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Date:</td>
              <td style="padding: 8px 0; color: #0369a1; font-weight: bold; font-size: 14px;">${new Date(appointment_date).toLocaleDateString()}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Time:</td>
              <td style="padding: 8px 0; color: #0369a1; font-weight: bold; font-size: 14px;">${appointment_time}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Status:</td>
              <td style="padding: 8px 0; font-size: 14px;">
                <span style="background-color: ${bgColor}; color: ${statusColor}; padding: 4px 8px; border-radius: 4px; font-weight: bold; font-size: 12px;">${statusText}</span>
              </td>
            </tr>
          </table>
        </div>
        
        <p style="color: #475569; font-size: 14px; line-height: 1.5; margin-bottom: 0;">
          If you have any questions, please contact our hospital reception.
        </p>
      </div>
      
      <div style="background-color: #f1f5f9; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
        <p style="margin: 0; color: #0f172a; font-weight: bold; font-size: 14px;">Dr. Raosaheb K. Borude</p>
        <p style="margin: 4px 0 0 0; color: #64748b; font-size: 13px;">Ophthalmologist | Cataract, Glaucoma & Refractive Surgeon</p>
      </div>
    </div>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"Varad Netralaya" <${process.env.EMAIL_USER}>`,
      to: patient_email,
      subject: `Appointment Status Updated: ${statusText} — Dr. Raosaheb K. Borude`,
      html: html,
    });
    console.log('Status update email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Failed to send status update email:', error);
    throw error;
  }
}

module.exports = {
  sendDoctorNotification,
  sendPatientConfirmation,
  sendStatusUpdateEmail
};
