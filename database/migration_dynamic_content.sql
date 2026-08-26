CREATE TABLE IF NOT EXISTS equipment (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  short_desc TEXT,
  image_url VARCHAR(255),
  is_active BOOLEAN DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS notices (
  id INT PRIMARY KEY AUTO_INCREMENT,
  notice_text TEXT NOT NULL,
  is_active BOOLEAN DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert existing equipment data
INSERT INTO equipment (name, short_desc, image_url) VALUES
('IOL Master 700', 'Advanced biometry for highly accurate IOL power calculation.', '/photos/Machine/iol-master-700.jpg'),
('Corneal Topography Machine', 'Precise mapping of the corneal surface for diagnostic evaluation.', '/photos/Machine/corneal-topography-mashine.jpg'),
('ZEISS Lumera I Microscope', 'Superior illumination and visualization for intricate surgical procedures.', '/photos/Machine/zeiss-iumera-i-microscope.jpg'),
('OCT + Angiography', 'High-resolution cross-sectional imaging of the retina and optic nerve.', '/photos/Machine/oct-angiography.jpg'),
('Vitrectomy Machine', 'Advanced surgical system for complex retinal and vitreous surgeries.', '/photos/Machine/vitrectomy-machine.jpg'),
('Green Laser', 'Precision laser for treating retinal tears, diabetic retinopathy, and other conditions.', '/photos/Machine/green-laser.jpg'),
('ZEISS Perimeter', 'Automated visual field testing for glaucoma detection and management.', '/photos/Machine/zeiss-perimeter.jpg'),
('ND YAG Laser', 'Effective laser therapy for post-cataract capsulotomy and glaucoma treatments.', '/photos/Machine/nd-yag-laser.jpg'),
('Ophthalmic Ultrasound Scanner', 'Detailed ultrasound imaging for evaluating the posterior segment of the eye.', '/photos/Machine/ophthalmic-ultrasound-scanner.jpg'),
('Cryotherapy Machine', 'Cold therapy system used in specific retinal and external eye procedures.', '/photos/Machine/cryotherapy-machine.jpg'),
('Zeiss Callisto', 'Computer-assisted cataract surgery system for precise toric IOL alignment.', '/photos/Machine/zeiss-callisto.png'),
('Schwind Amaris 750S', 'High-performance excimer laser for bladeless, customized LASIK refractive surgery.', '/photos/Machine/schwind-amaris-750s.png'),
('3 Modular Operation Theaters', 'World-class modular operation theaters equipped with Laminar Airflow for sterile surgeries.', '/photos/Machine/3-modular-operation-theaters-with-laminar-airflow.png');

-- Insert existing notices
INSERT INTO notices (notice_text) VALUES
('कुठलीही डोळ्यांची औषधे मनाने घेऊ नयेत.'),
('थेंबाचे औषध उघडल्यानंतर ३० दिवसात संपवावे अन्यथा टाकून द्यावे.'),
('चष्म्याचा नंबर कुठल्याही वयात लागू शकतो.'),
('चष्मा वापरल्याने नंबर कमी होत नाही.'),
('चाळीशीनंतर वाचण्यासाठी चष्म्याची गरज पडते.'),
('मधुमेह व रक्तदाब असणाऱ्या पेशंटनी दर सहा महिन्यांनी डोळे तपासावेत.'),
('चाळीस वयानंतर काचबिंदूची तपासणी करणे आवश्यक आहे.'),
('मोतिबिंदू वयोमानाप्रमाणे होत असल्याने त्यावर प्रतिबंधात्मक उपाय नाहीत.'),
('मोतिबिंदूसाठी कुठलेही औषधे नसून ऑपरेशन हा त्यावरील एकमेव उपचार आहे.');

-- Also, gallery table exists, but let's insert the static gallery data if we want.
-- Wait, gallery is already partially there or empty. I will let the user use the admin panel for gallery.
-- The prompt doesn't specify seeding gallery. We can leave it for the admin to add.
