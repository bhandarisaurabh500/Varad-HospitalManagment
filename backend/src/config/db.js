const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Store the original query method
const originalQuery = pool.query.bind(pool);

// Provide a custom execute method to mimic mysql2's API
pool.execute = async (sql, params = []) => {
  try {
    // 1. Convert MySQL `?` placeholders to Postgres `$1`, `$2`, etc.
    let paramIndex = 1;
    let pgSql = sql.replace(/\?/g, () => `$${paramIndex++}`);
    
    // 2. Convert MySQL backticks to standard double quotes
    pgSql = pgSql.replace(/`/g, '"');

    // 3. Auto-append RETURNING id for INSERT queries if not present
    const isInsert = pgSql.trim().toUpperCase().startsWith('INSERT INTO');
    if (isInsert && !pgSql.toUpperCase().includes('RETURNING')) {
      pgSql += ' RETURNING id';
    }

    // Execute the query via pg
    const result = await originalQuery(pgSql, params);

    // Format the response to look like mysql2
    let rows = result.rows;

    // Add insertId and affectedRows to the array to mimic mysql2 for INSERT/UPDATE operations
    if (isInsert && result.rows.length > 0) {
      rows.insertId = result.rows[0].id;
    }
    rows.affectedRows = result.rowCount;

    return [rows, result.fields];
  } catch (error) {
    console.error('Database query failed:', error.message);
    console.error('SQL:', sql);
    console.error('Params:', params);
    throw error;
  }
};

// Add a getConnection method for transactions/testing
pool.getConnection = async () => {
  const client = await pool.connect();
  const originalClientQuery = client.query.bind(client);
  
  client.execute = async (sql, params = []) => {
    let paramIndex = 1;
    let pgSql = sql.replace(/\?/g, () => `$${paramIndex++}`).replace(/`/g, '"');
    const isInsert = pgSql.trim().toUpperCase().startsWith('INSERT INTO');
    if (isInsert && !pgSql.toUpperCase().includes('RETURNING')) {
      pgSql += ' RETURNING id';
    }
    const result = await originalClientQuery(pgSql, params);
    let rows = result.rows;
    if (isInsert && result.rows.length > 0) {
      rows.insertId = result.rows[0].id;
    }
    rows.affectedRows = result.rowCount;
    return [rows, result.fields];
  };

  return client;
};

// Verify connection on startup
async function testConnection() {
  try {
    const conn = await pool.connect();
    console.log('✅ PostgreSQL (Supabase) connected successfully');
    conn.release();
  } catch (err) {
    console.error('❌ PostgreSQL connection failed:', err.message);
    process.exit(1);
  }
}

module.exports = { pool, testConnection };
