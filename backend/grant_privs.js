const { pool } = require('./src/config/db');

async function grantPrivileges() {
  try {
    const roles = ['anon', 'authenticated'];
    for (const role of roles) {
      console.log(`Granting privileges to ${role}...`);
      await pool.execute(`GRANT USAGE ON SCHEMA public TO ${role};`);
      await pool.execute(`GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO ${role};`);
      await pool.execute(`GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO ${role};`);
      await pool.execute(`ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO ${role};`);
      await pool.execute(`ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO ${role};`);
    }
    console.log('Privileges granted successfully!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
grantPrivileges();
