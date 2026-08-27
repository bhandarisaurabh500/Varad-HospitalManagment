const axios = require('axios');

async function test() {
  try {
    const res = await axios.post('https://backend-five-vert-91.vercel.app/api/appointments', {
        doctor_id: 1,
        appointment_date: '2026-09-02',
        appointment_time: '14:00:00',
        patient_name: 'Navnath',
        patient_email: 'jangalenavnath333@gmail.com',
        patient_phone: '7720991375',
        age: 22,
        gender: 'MALE',
        symptoms: 'Checkup'
    });
    console.log('Success:', res.data);
  } catch (err) {
    console.log('Error Status:', err.response?.status);
    console.log('Error Data:', err.response?.data);
  }
}

test();
