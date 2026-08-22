require('dotenv').config();
const { pool } = require('./src/config/db');

pool.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'insurance_providers'").then(res => console.log(res.rows)).catch(console.log).finally(() => process.exit());
