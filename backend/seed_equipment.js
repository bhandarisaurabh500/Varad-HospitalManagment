const { pool } = require('./src/config/db');

const staticEquipment = [
  {
    id: 1,
    name: "IOL Master 700",
    shortDesc: "Advanced biometry for highly accurate IOL power calculation.",
    image: "/photos/machine/1. IOL master 700 .png"
  },
  {
    id: 2,
    name: "Corneal Topography Machine",
    shortDesc: "Precise mapping of the corneal surface for diagnostic evaluation.",
    image: "/photos/machine/2. Corneal topography machine.png"
  },
  {
    id: 3,
    name: "ZEISS Lumera I Microscope",
    shortDesc: "Superior illumination and visualization for intricate surgical procedures.",
    image: "/photos/machine/3. Zeiss lumera I microscope.png"
  },
  {
    id: 4,
    name: "OCT + Angiography",
    shortDesc: "High-resolution cross-sectional imaging with retinal blood flow analysis.",
    image: "/photos/machine/4. Oct + Angiography.png"
  },
  {
    id: 5,
    name: "Vitrectomy Machine",
    shortDesc: "Advanced system for complex retinal and vitreous surgeries.",
    image: "/photos/machine/5. Vitrectomy machine.png"
  },
  {
    id: 6,
    name: "Green Laser",
    shortDesc: "Targeted laser therapy for diabetic retinopathy and other retinal diseases.",
    image: "/photos/machine/6. Green laser.png"
  }
];

async function seedEquipment() {
  try {
    const [existingRows] = await pool.execute('SELECT name FROM equipment');
    const existingNames = existingRows.map(row => row.name);
    
    let addedCount = 0;
    for (const item of staticEquipment) {
      if (!existingNames.includes(item.name)) {
        await pool.execute(
          'INSERT INTO equipment (name, short_desc, image_url, is_active) VALUES (?, ?, ?, ?)',
          [item.name, item.shortDesc, item.image, 1]
        );
        addedCount++;
      }
    }
    
    console.log(`Successfully added ${addedCount} missing equipment records!`);
  } catch (err) {
    console.error('Error seeding equipment:', err);
  } finally {
    process.exit();
  }
}

seedEquipment();
