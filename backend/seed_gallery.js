const { pool } = require('./src/config/db');

const items = [
  {
    title: "Clinic Interior",
    category: "Facilities",
    desc: "Bright Teal Medical Clinic Interior.",
    imageUrl: "/photos/Gallary/Bright Teal Medical Clinic Interior.png"
  },
  {
    title: "Pediatric Eye Clinic",
    category: "Facilities",
    desc: "Colorful Underwater Pediatric Clinic area.",
    imageUrl: "/photos/Gallary/Colorful Underwater Pediatric Dental Clinic.png"
  },
  {
    title: "Ophthalmology Exam Room",
    category: "Equipment",
    desc: "Modern Aqua Ophthalmology Exam Room.",
    imageUrl: "/photos/Gallary/Modern Aqua Ophthalmology Exam Room.png"
  },
  {
    title: "Hospital Room",
    category: "Facilities",
    desc: "Modern Hospital Room Through Wooden Door.",
    imageUrl: "/photos/Gallary/Modern Hospital Room Through Wooden Door.png"
  },
  {
    title: "Eye Exam Room",
    category: "Facilities",
    desc: "Modern Mint Eye Exam Room.",
    imageUrl: "/photos/Gallary/Modern Mint Eye Exam Room.png"
  },
  {
    title: "Examination Room",
    category: "Facilities",
    desc: "Modern Mint Green Examination Room.",
    imageUrl: "/photos/Gallary/Modern Mint Green Examination Room.png"
  },
  {
    title: "Waiting Room",
    category: "Facilities",
    desc: "Modern Waiting Room with TV and Seating.",
    imageUrl: "/photos/Gallary/Modern Waiting Room with TV and Seating.png"
  },
  {
    title: "Procedure Room",
    category: "Operation Theatre",
    desc: "Sterile Clinical Procedure Room.",
    imageUrl: "/photos/Gallary/Sterile Clinical Procedure Room.png"
  },
  {
    title: "Eye Care Infographic",
    category: "Patients",
    desc: "Child Rubbing Eye Medical Infographic.",
    imageUrl: "/photos/Eye Problems/Child Rubbing Eye Medical Infographic.png"
  },
  {
    title: "Eye Care Awareness",
    category: "Patients",
    desc: "Eye Care Awareness Poster.",
    imageUrl: "/photos/Eye Problems/Eye Care Awareness Poster.png"
  },
  {
    title: "Hydration and Eye Health",
    category: "Patients",
    desc: "Hydration and Eye Health Connection Poster.",
    imageUrl: "/photos/Eye Problems/Hydration and Eye Health Connection Poster.png"
  },
  {
    title: "धूम्रपान आणि डोळ्यांचे आरोग्य",
    category: "Patients",
    desc: "धूम्रपान आणि डोळ्यांचे आरोग्य (Smoking and Eye Health).",
    imageUrl: "/photos/Eye Problems/धूम्रपान आणि डोळ्यांचे आरोग्य.png"
  },
  {
    title: "Dr. Borude – Award Ceremony",
    category: "Awards",
    desc: "Award Ceremony.",
    imageUrl: "/photos/doctor/Doctor 1.png"
  },
  {
    title: "Dr. Borude – Felicitation",
    category: "Awards",
    desc: "Felicitation.",
    imageUrl: "/photos/doctor/Doctor 2.png"
  },
  {
    title: "Excellence Award 2024",
    category: "Awards",
    desc: "Excellence Award 2024.",
    imageUrl: "/photos/Award/Award-2024.png"
  }
];

async function seed() {
  try {
    // Delete existing dummy data
    await pool.execute('DELETE FROM gallery');
    console.log('Deleted old gallery items.');

    let order = 1;
    for (const item of items) {
      await pool.execute(
        'INSERT INTO gallery (title, description, image_url, category, sort_order) VALUES (?, ?, ?, ?, ?)',
        [item.title, item.desc, item.imageUrl, item.category, order++]
      );
    }
    console.log('Successfully seeded English photos into the DB!');
  } catch (err) {
    console.error(err);
  } finally {
    process.exit();
  }
}

seed();
