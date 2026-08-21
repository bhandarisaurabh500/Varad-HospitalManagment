const { pool } = require('./src/config/db');

async function fixRLS() {
  try {
    const queries = [
      // Disable RLS on tables for now so frontend can read/write directly
      "ALTER TABLE appointments DISABLE ROW LEVEL SECURITY;",
      "ALTER TABLE patients DISABLE ROW LEVEL SECURITY;",
      "ALTER TABLE users DISABLE ROW LEVEL SECURITY;"
    ];

    for (const q of queries) {
      await pool.execute(q);
      console.log('Executed:', q);
    }
    console.log('RLS disabled successfully!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
fixRLS();
