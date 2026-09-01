const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

async function testUpload() {
  const form = new FormData();
  form.append('name', 'Test Equipment');
  form.append('short_desc', 'Test short description');
  form.append('image', fs.createReadStream('../frontend/public/photos/Machine/example.jpg'));

  try {
    const res = await axios.post('http://localhost:5000/api/equipment', form, {
      headers: {
        ...form.getHeaders(),
        // Mock token for auth if needed, but maybe I don't have a valid one. Wait, it needs admin role!
        'Authorization': 'Bearer ' + 'dummy'
      }
    });
    console.log(res.data);
  } catch (err) {
    console.error(err.response ? err.response.data : err.message);
  }
}
testUpload();
