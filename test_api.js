const http = require('http');

const testApi = async (path, method = 'GET', body = null, token = null) => {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };
    if (token) options.headers['Authorization'] = `Bearer ${token}`;

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ status: res.statusCode, data: JSON.parse(data || '{}') });
      });
    });

    req.on('error', (e) => resolve({ status: 500, error: e.message }));
    
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
};

(async () => {
  console.log("--- Varad Netralaya API QA Tests ---");
  
  // 1. Test Public Notices
  const publicNotices = await testApi('/api/notices');
  console.log(`[GET /api/notices] Status: ${publicNotices.status}, count: ${publicNotices.data.data?.length || 0}`);
  
  // 2. Test Admin Login (assuming test credentials or placeholder)
  // We know authController uses username or email. Let's try admin/admin
  const login = await testApi('/api/auth/login', 'POST', { email: 'admin', password: 'adminpassword' });
  console.log(`[POST /api/auth/login] Status: ${login.status}`);
  let token = null;
  if (login.status === 200 && login.data.token) {
    token = login.data.token;
    console.log("✅ Admin Login Successful");
  } else {
    console.log("❌ Admin Login Failed: ", login.data);
  }
  
  // 3. Test Admin Protected Route (Notices)
  if (token) {
    const adminNotices = await testApi('/api/notices/admin', 'GET', null, token);
    console.log(`[GET /api/notices/admin] Status: ${adminNotices.status}`);
  }

  // 4. Test Appointment Creation (Public)
  const appt = await testApi('/api/appointments', 'POST', {
    patient_name: 'QA Test User',
    phone: '9999999999',
    age: 30,
    appointment_date: new Date().toISOString().split('T')[0],
    time_slot: 'Morning',
    disease: 'Cataract'
  });
  console.log(`[POST /api/appointments] Status: ${appt.status}`);
  
  process.exit(0);
})();
