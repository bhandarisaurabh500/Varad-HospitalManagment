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

CREATE TABLE IF NOT EXISTS site_settings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  setting_key VARCHAR(100) NOT NULL UNIQUE,
  setting_value JSON NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT IGNORE INTO site_settings (setting_key, setting_value) VALUES
('hospital_info', JSON_OBJECT('name', 'Dr. Ravsaheb Borude', 'marathiName', 'डॉ. रावसाहेब बोरुडे', 'tagline', 'Cataract, Glaucoma & Refractive Surgeon', 'doctorPersonalMobile', '+91 9822315840', 'appointmentPhone', '+91 9923890890', 'clinicPhone', '(0241) 2324680 / 2415600', 'email', 'contact@drborude.com', 'address', 'Ahilyanagar, Maharashtra', 'workingHours', JSON_OBJECT('weekdays', 'OPD: Tue, Thu, Sat | Surgery: Mon, Wed, Fri', 'sunday', 'Closed'))),
('stats', JSON_OBJECT('happyPatients', '10,000+', 'successfulSurgeries', '8,500+', 'experiencedDoctors', '22+ Years Experience', 'yearsOfExperience', '22+', 'googleRating', '4.9')),
('about_data', JSON_OBJECT('title', 'About Varad Netralaya', 'subtitle', 'Prominent Eye Care Clinic in Savedi, Ahilyanagar (Ahmednagar)', 'description', 'Varad Netralaya (वरद नेत्रालय, सावेडी, अहिल्यानगर) is a renowned eye super-specialty clinic led by experienced senior ophthalmologist Dr. Raosaheb Kundlik Borude.', 'history', 'Trusted by over 30,000+ patients across Ahilyanagar, Varad Netralaya has established an outstanding 4.9★ Google Rating backed by 439+ verified patient reviews for clinical precision and patient care.', 'mission', 'To deliver accessible, accurate, and world-class vision care through cutting-edge diagnostic technology, surgical mastery, and compassionate patient service.', 'vision', 'To remain the most trusted tertiary eye care institute in Ahilyanagar for vision preservation and sight restoration.')),
('why_choose_us', JSON_ARRAY(JSON_OBJECT('title', 'Dr. Ravsaheb Borude', 'desc', 'Renowned senior ophthalmologist in Savedi, Ahilyanagar.', 'icon', 'FaUserCheck'), JSON_OBJECT('title', '4.9★ Rated (439+ Google Reviews)', 'desc', 'Highly trusted eye clinic in Ahilyanagar with over 30,000+ satisfied visual outcomes.', 'icon', 'FaStar'), JSON_OBJECT('title', 'Advanced Computerized Eye Testing', 'desc', 'State-of-the-art autorefraction, perimetry, slit lamp biomicroscopy & fundus testing.', 'icon', 'FaLaptopMedical'), JSON_OBJECT('title', '100% Cashless Insurance Tie-ups', 'desc', 'Empaneled with Zurich Kotak, Star Health, HDFC ERGO, and leading TPAs.', 'icon', 'FaShieldAlt'))),
('faq_list', JSON_ARRAY(JSON_OBJECT('q', 'What are the clinic timings of Varad Netralaya Savedi?', 'a', 'Varad Netralaya is open Monday through Saturday from 8:00 AM to 9:00 PM. On Sundays, the OPD remains closed, but emergency eye care assistance is available.'), JSON_OBJECT('q', 'Is stitchless phaco cataract surgery available at Varad Netralaya?', 'a', 'Yes! We specialize in micro-incision stitchless phacoemulsification cataract surgery with premium monofocal, multifocal, and toric intraocular lens (IOL) implantations.')));

-- Pre-populate some services
INSERT IGNORE INTO services (name, slug, short_desc, description, icon) VALUES 
('Cataract & Phaco Surgery', 'phaco-surgery', 'Stitchless Micro-Incision Procedure', 'Pain-free, stitch-less cataract removal with premium Intraocular Lenses (IOLs).', 'FaMicroscope'),
('Glaucoma & Retina Services', 'glaucoma-retina', 'Advanced Diagnostics & Treatment', 'Comprehensive screening and treatment for Glaucoma and Retinal diseases.', 'FaEye'),
('Permanent Spectacle Removal', 'lasik-refractive', 'Freedom From Glasses', 'Touchless, bladeless LASIK surgery for permanent vision correction.', 'FaStar');
