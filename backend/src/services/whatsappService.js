const axios = require('axios');

const evoApiUrl = process.env.EVOLUTION_API_URL; // e.g. https://your-ngrok-url.ngrok.app (DON'T USE LOCALHOST)
const evoApiKey = process.env.EVOLUTION_API_KEY; // Global API Key
const instanceName = process.env.EVOLUTION_INSTANCE_NAME; // e.g. varad-netralaya

/**
 * Format phone number to E.164 format for WhatsApp if needed.
 * Evolution API usually expects just the country code + number, e.g. 919923890890
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
 * Helper to send message via Evolution API
 */
async function sendEvolutionMessage(toPhone, messageText) {
  if (!evoApiUrl || !evoApiKey || !instanceName) {
    console.warn('Evolution API credentials not set. Skipping WhatsApp message.');
    return;
  }

  // Remove trailing slash if present
  const baseUrl = evoApiUrl.endsWith('/') ? evoApiUrl.slice(0, -1) : evoApiUrl;
  const endpoint = `${baseUrl}/message/sendText/${instanceName}`;
  
  try {
    const response = await axios.post(
      endpoint,
      {
        number: toPhone,
        options: {
          delay: 1000, // 1 second delay
          presence: "composing"
        },
        textMessage: {
          text: messageText
        }
      },
      {
        headers: {
          'apikey': evoApiKey,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('WhatsApp message sent via Evolution API:', response.data?.message?.id || 'Success');
    return response.data;
  } catch (error) {
    console.error('Evolution API error:', error?.response?.data || error.message);
    // Don't throw, we don't want to crash the main app if WA fails
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

  return await sendEvolutionMessage(toWhatsAppNumber, messageText);
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

  return await sendEvolutionMessage(toWhatsAppNumber, messageText);
}

module.exports = {
  sendPatientWhatsAppConfirmation,
  sendWhatsAppStatusUpdate
};
