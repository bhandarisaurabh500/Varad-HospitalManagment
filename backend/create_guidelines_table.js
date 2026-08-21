const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function createTable() {
  try {
    console.log('Creating healthcare_guidelines table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS healthcare_guidelines (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        icon VARCHAR(100),
        points JSONB NOT NULL,
        is_active SMALLINT DEFAULT 1,
        sort_order INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    console.log('Table created successfully.');

    // Insert default data if empty
    const { rows } = await pool.query('SELECT COUNT(*) FROM healthcare_guidelines');
    if (parseInt(rows[0].count) === 0) {
      console.log('Inserting default guidelines...');
      
      const defaultData = [
        {
          title: "Patient Care Guidelines",
          icon: "FaUserShield",
          points: [
            "डॉक्टरांनी सांगितलेल्या औषधांचा आणि आय ड्रॉप्सचा वेळेवर वापर करा.",
            "डोळ्यांना हाताने चोळू नका.",
            "डॉक्टरांच्या सल्ल्याशिवाय कोणतेही आय ड्रॉप्स वापरू नका."
          ],
          sort_order: 1
        },
        {
          title: "Before Eye Surgery",
          icon: "FaProcedures",
          points: [
            "डॉक्टरांनी दिलेल्या सर्व सूचनांचे पालन करा.",
            "नियमित औषधे घेत असल्यास डॉक्टरांना माहिती द्या.",
            "शस्त्रक्रियेपूर्वी आवश्यक तपासण्या पूर्ण करा."
          ],
          sort_order: 2
        },
        {
          title: "After Eye Surgery",
          icon: "FaHandHoldingMedical",
          points: [
            "डोळ्यात पाणी, धूळ किंवा घाण जाऊ देऊ नका.",
            "डोळ्यांना चोळू नका.",
            "डॉक्टरांनी सांगितलेले आय ड्रॉप्स वेळेवर वापरा.",
            "Follow-up appointment चुकवू नका."
          ],
          sort_order: 3
        }
      ];

      for (const item of defaultData) {
        await pool.query(
          `INSERT INTO healthcare_guidelines (title, icon, points, sort_order) VALUES ($1, $2, $3, $4)`,
          [item.title, item.icon, JSON.stringify(item.points), item.sort_order]
        );
      }
      console.log('Default data inserted.');
    }
  } catch (error) {
    console.error('Error creating table:', error);
  } finally {
    pool.end();
  }
}

createTable();
