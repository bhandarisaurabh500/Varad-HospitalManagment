const { pool } = require('./src/config/db');

async function test() {
  try {
    const [rows] = await pool.execute('DESCRIBE equipment');
    console.log(rows);
  } catch (err) {
    try {
      // In PostgreSQL, DESCRIBE is not valid. Use information_schema
      const [rows2] = await pool.execute(`
        SELECT column_name, data_type, character_maximum_length
        FROM information_schema.columns
        WHERE table_name = 'equipment';
      `);
      console.log(rows2);
    } catch (e2) {
      console.error(e2);
    }
  }
  process.exit();
}
test();
