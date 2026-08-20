require('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function runSQL() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true
  });

  try {
    const schemaSql = fs.readFileSync(path.join(__dirname, '../database/schema_v2_update.sql'), 'utf8');
    const seedSql = fs.readFileSync(path.join(__dirname, '../database/seed_v2.sql'), 'utf8');

    console.log('Running Schema V2 Updates...');
    await connection.query(schemaSql);
    console.log('Schema updated successfully.');

    console.log('Running Seed V2...');
    await connection.query(seedSql);
    console.log('Seed data inserted successfully.');

  } catch (error) {
    console.error('Error executing SQL:', error);
  } finally {
    await connection.end();
  }
}

runSQL();
