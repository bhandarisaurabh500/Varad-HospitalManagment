const { pool } = require('./src/config/db.js');
const { advancedEquipmentList } = require('../frontend/src/data/hospitalData.js'); // Cannot require JSX maybe? It's js, but uses export const. Wait, node doesn't support ES modules easily without type: module.

// I'll just copy the data
const data = [
  {name: 'IOL Master 700', short_desc: 'Advanced biometry for highly accurate IOL power calculation.', image_url: '/photos/Machine/iol-master-700.jpg'}, 
  {name: 'Corneal Topography Machine', short_desc: 'Precise mapping of the corneal surface for diagnostic evaluation.', image_url: '/photos/Machine/corneal-topography-mashine.jpg'}, 
  {name: 'ZEISS Lumera I Microscope', short_desc: 'Superior illumination and visualization for intricate surgical procedures.', image_url: '/photos/Machine/zeiss-iumera-i-microscope.jpg'}, 
  {name: 'OCT + Angiography', short_desc: 'High-resolution cross-sectional imaging of the retina and optic nerve.', image_url: '/photos/Machine/oct-angiography.jpg'}, 
  {name: 'Vitrectomy Machine', short_desc: 'Advanced surgical system for complex retinal and vitreous surgeries.', image_url: '/photos/Machine/vitrectomy-machine.jpg'}, 
  {name: 'Green Laser', short_desc: 'Precision laser for treating retinal tears, diabetic retinopathy, and other conditions.', image_url: '/photos/Machine/green-laser.jpg'}, 
  {name: 'ZEISS Perimeter', short_desc: 'Automated visual field testing for glaucoma detection and management.', image_url: '/photos/Machine/zeiss-perimeter.jpg'}, 
  {name: 'ND YAG Laser', short_desc: 'Effective laser therapy for post-cataract capsulotomy and glaucoma treatments.', image_url: '/photos/Machine/nd-yag-laser.jpg'}, 
  {name: 'Ophthalmic Ultrasound Scanner', short_desc: 'Detailed ultrasound imaging for evaluating the posterior segment of the eye.', image_url: '/photos/Machine/ophthalmic-ultrasound-scanner.jpg'}, 
  {name: 'Cryotherapy Machine', short_desc: 'Cold therapy system used in specific retinal and external eye procedures.', image_url: '/photos/Machine/cryotherapy-machine.jpg'}, 
  {name: 'Zeiss Callisto', short_desc: 'Computer-assisted cataract surgery system for precise toric IOL alignment.', image_url: '/photos/Machine/zeiss-callisto.png'}, 
  {name: 'Schwind Amaris 750S', short_desc: 'High-performance excimer laser for bladeless, customized LASIK refractive surgery.', image_url: '/photos/Machine/schwind-amaris-750s.png'}, 
  {name: '3 Modular Operation Theaters', short_desc: 'World-class modular operation theaters equipped with Laminar Airflow for sterile surgeries.', image_url: '/photos/Machine/3-modular-operation-theaters-with-laminar-airflow.png'}
];

async function insert() {
  for (let e of data) {
    try {
      await pool.execute('INSERT INTO equipment (name, short_desc, image_url, is_active) VALUES (?, ?, ?, 1)', [e.name, e.short_desc, e.image_url]);
    } catch(err) {
      console.error(err);
    }
  }
  console.log('Done inserted');
  process.exit(0);
}
insert();
