const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromWhatsAppNumber = process.env.TWILIO_WHATSAPP_NUMBER; // e.g. 'whatsapp:+14155238886'

let client = null;
if (accountSid && authToken) {
  try {
    client = twilio(accountSid, authToken);
  } catch (error) {
    console.error('Failed to initialize Twilio client:', error);
  }
}

/**
 * Format phone number to E.164 format for WhatsApp if needed.
 * Assuming Indian numbers (+91), or if not specified, add it.
 */
function formatWhatsAppNumber(phone) {
  if (!phone) return null;
  // Remove non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `whatsapp:+91${cleaned}`;
  } else if (cleaned.length > 10) {
    return `whatsapp:+${cleaned}`;
  }
  return null;
}

/**
 * Send a WhatsApp confirmation to the patient for a new appointment
 */
async function sendPatientWhatsAppConfirmation(appointmentDetails) {
  if (!client || !fromWhatsAppNumber) {
    console.warn('Twilio credentials not set. Skipping WhatsApp notification.');
    return;
  }

  const {
    appointment_no,
    patient_name,
    patient_phone,
    appointment_date,
    appointment_time
  } = appointmentDetails;

  const toWhatsAppNumber = formatWhatsAppNumber(patient_phone);
  
  if (!toWhatsAppNumber) {
    console.warn('Invalid patient phone number for WhatsApp:', patient_phone);
    return;
  }

  const messageText = `Hello ${patient_name},\n\nYour appointment request has been received at Varad Netralaya.\n\n*ID:* ${appointment_no}\n*Date:* ${new Date(appointment_date).toLocaleDateString()}\n*Time:* ${appointment_time}\n\nOur staff will review and confirm this shortly.`;

  try {
    const message = await client.messages.create({
      body: messageText,
      from: fromWhatsAppNumber,
      to: toWhatsAppNumber
    });
    console.log('Patient WhatsApp confirmation sent:', message.sid);
    return message;
  } catch (error) {
    console.error('Failed to send WhatsApp confirmation:', error);
    // Don't throw so it doesn't break the flow if WhatsApp fails
  }
}

/**
 * Send a WhatsApp notification when appointment status changes
 */
async function sendWhatsAppStatusUpdate(appointmentDetails, newStatus) {
  if (!client || !fromWhatsAppNumber) {
    console.warn('Twilio credentials not set. Skipping WhatsApp status update.');
    return;
  }

  const {
    appointment_no,
    patient_name,
    patient_phone,
    appointment_date,
    appointment_time
  } = appointmentDetails;

  const toWhatsAppNumber = formatWhatsAppNumber(patient_phone);
  
  if (!toWhatsAppNumber) {
    console.warn('Invalid patient phone number for WhatsApp:', patient_phone);
    return;
  }

  let customMessage = '';
  if (newStatus === 'CONFIRMED') {
    customMessage = `has been *APPROVED*.\nPlease arrive 10 mins early.`;
  } else if (newStatus === 'CANCELLED') {
    customMessage = `could not be fulfilled and is *CANCELLED*. Please contact us to reschedule.`;
  } else if (newStatus === 'RESCHEDULED') {
    customMessage = `has been *RESCHEDULED*.\nPlease note the new date and time.`;
  } else if (newStatus === 'PENDING') {
    customMessage = `is currently *PENDING* confirmation.`;
  }

  const messageText = `Hello ${patient_name},\n\nYour appointment (${appointment_no}) on ${new Date(appointment_date).toLocaleDateString()} at ${appointment_time} ${customMessage}\n\nThank you,\nVarad Netralaya`;

  try {
    const message = await client.messages.create({
      body: messageText,
      from: fromWhatsAppNumber,
      to: toWhatsAppNumber
    });
    console.log('Patient WhatsApp status update sent:', message.sid);
    return message;
  } catch (error) {
    console.error('Failed to send WhatsApp status update:', error);
  }
}

module.exports = {
  sendPatientWhatsAppConfirmation,
  sendWhatsAppStatusUpdate
};
