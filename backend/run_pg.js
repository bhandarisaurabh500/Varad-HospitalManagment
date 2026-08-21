require('dotenv').config();
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

async function runSQL() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    console.log('Connected to PostgreSQL (Supabase) successfully.');

    const schemaSql = fs.readFileSync(path.join(__dirname, '../database/pg_schema.sql'), 'utf8');
    const seedSql = fs.readFileSync(path.join(__dirname, '../database/pg_seed.sql'), 'utf8');

    console.log('Running PostgreSQL Schema...');
    await client.query(schemaSql);
    console.log('Schema created successfully.');

    console.log('Running PostgreSQL Seed Data...');
    await client.query(seedSql);
    console.log('Seed data inserted successfully.');

  } catch (error) {
    console.error('Error executing SQL:', error);
  } finally {
    await client.end();
  }
}

runSQL();
