const axios = require('axios');

const waApiUrl = process.env.WHATSAPP_API_URL;
const waApiKey = process.env.WHATSAPP_API_KEY; 

/**
 * Format phone number to E.164 format for WhatsApp if needed.
 */
function formatWhatsAppNumber(phone) {
  if (!phone) return null;
  // Remove non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `91${cleaned}`; // Add country code if missing
  }
  return cleaned;
}

/**
 * Helper to send message exactly matching the user's Postman setup
 */
async function sendWhatsAppMessage(toPhone, messageText) {
  if (!waApiUrl) {
    console.warn('WhatsApp API URL not set. Skipping message.');
    return;
  }

  // Ensure no trailing slash
  const baseUrl = waApiUrl.endsWith('/') ? waApiUrl.slice(0, -1) : waApiUrl;
  
  // Endpoint exactly matching user's Postman: /send/text
  const endpoint = `${baseUrl}/send/text`;
  
  try {
    const response = await axios.post(
      endpoint,
      {
        number: toPhone, 
        text: messageText, 
        delay: 1200
      },
      {
        headers: {
          'apikey': waApiKey || '',
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
          'Bypass-Tunnel-Reminder': 'true'
        }
      }
    );
    console.log('WhatsApp message sent successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('WhatsApp API error:', error?.response?.data || error.message);
  }
}

/**
 * Send a WhatsApp confirmation to the patient for a new appointment
 */
async function sendPatientWhatsAppConfirmation(appointmentDetails) {
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

  return await sendWhatsAppMessage(toWhatsAppNumber, messageText);
}

/**
 * Send a WhatsApp notification when appointment status changes
 */
async function sendWhatsAppStatusUpdate(appointmentDetails, newStatus) {
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

  const messageText = `Hello ${patient_name},\n\nUpdate regarding your appointment (*ID: ${appointment_no}*) at Varad Netralaya.\n\nYour appointment for *${new Date(appointment_date).toLocaleDateString()}* at *${appointment_time}* ${customMessage}\n\nThank you!`;

  return await sendWhatsAppMessage(toWhatsAppNumber, messageText);
}

module.exports = {
  sendPatientWhatsAppConfirmation,
  sendWhatsAppStatusUpdate
};
