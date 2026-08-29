const { pool } = require('./src/config/db');
const bcrypt = require('bcryptjs');

async function updateAdmin() {
  try {
    const username = 'admin';
    const password = 'admin@123';
    
    // Hash the password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update the database
    // We are setting the email/username to 'admin' and updating the password
    await pool.execute(
      `UPDATE users 
       SET email = ?, password = ? 
       WHERE role_id = (SELECT id FROM roles WHERE name = 'ADMIN')`,
      [username, hashedPassword]
    );

    console.log('✅ Admin credentials updated successfully in the database.');
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Error updating admin:', err);
    process.exit(1);
  }
}

updateAdmin();
