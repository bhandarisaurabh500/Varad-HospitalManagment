const axios = require('axios');

async function testUpload() {
  try {
    const res = await axios.post('https://varad-netralaya.vercel.app/api/equipment', { name: "Test" }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(res.data);
  } catch (err) {
    console.error('Status:', err.response?.status);
    console.error('Data:', err.response?.data);
    console.error('Message:', err.message);
  }
}
testUpload();
