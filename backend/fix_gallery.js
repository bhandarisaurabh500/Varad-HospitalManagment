const { Pool } = require('pg');
require('dotenv').config();

async function fixGallery() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  
  try {
    await pool.query("UPDATE gallery SET image_url = '/photos/facilities/operation-theatre.png' WHERE image_url = '/photos/hospital/operation-theatre.png'");
    await pool.query("UPDATE gallery SET image_url = '/photos/facilities/consultation-room.png' WHERE image_url = '/photos/hospital/consultation-room.png'");
    await pool.query("UPDATE gallery SET image_url = '/photos/facilities/hospital-ward.png' WHERE image_url = '/photos/hospital/hospital-ward.png'");
    await pool.query("UPDATE gallery SET image_url = '/photos/equipment/equipment-professional.png' WHERE image_url = '/photos/hospital/equipment-professional.png'");
    
    console.log("Gallery paths updated in DB successfully!");
  } catch(e) {
    console.error(e);
  }
  process.exit();
}
fixGallery();
