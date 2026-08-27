-- ============================================================
-- EYE HOSPITAL MANAGEMENT SYSTEM - POSTGRESQL SEED DATA
-- ============================================================

-- ROLES
INSERT INTO roles (id, name) VALUES (1, 'ADMIN'), (2, 'DOCTOR'), (3, 'PATIENT') ON CONFLICT DO NOTHING;
SELECT setval('roles_id_seq', (SELECT MAX(id) FROM roles));

-- USERS (passwords are bcrypt hash of 'Admin@123', 'Doctor@123', 'Patient@123')
INSERT INTO users (id, role_id, full_name, email, phone, password, is_active) VALUES
(1, 1, 'Super Admin', 'admin', '+91 9000000001', '$2a$12$cAu178gy9seaAPQtdPm4q.KVkNciTjAaS8oNdMNaE./M2SBDtKvvK', 1),
(2, 2, 'Dr. Raosaheb Kundlik Borude', 'dr.borude@varadnetralaya.com', '+91 9822315840', '$2a$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWEwrkm', 1),
(4, 3, 'Ramesh Sharma', 'ramesh.sharma@example.com', '+91 9876543210', '$2a$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWEwrkm', 1),
(5, 3, 'Sunita Patil', 'sunita.patil@example.com', '+91 9876543211', '$2a$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWEwrkm', 1)
ON CONFLICT DO NOTHING;
SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));

-- DOCTORS
INSERT INTO doctors (id, user_id, registration_no, qualification, specialization, experience_years, about, expertise, consultation_fee, photo_url, opd_days, operation_days, contact_phone, designation, intro_text) VALUES
(1, 2, 'MH-MMC-2001-12876', 'M.B.B.S., D.O.M.S., F.I.G.O.', 'Ophthalmology – Pune University', 22, 'Fellowship in General Ophthalmology & Phacosurgery', '["Cataract & Phaco Surgery","LASIK Refractive Surgery","Retina & Vitreous","Glaucoma Management","Automated Perimetry","Diabetic Retinopathy","Oculoplasty"]', 500.00, '/photos/doctor/dr-ravsaheb-borude-poster.jpg', 'मंगळवार • गुरुवार • शनिवार', 'सोमवार • बुधवार • शुक्रवार', '98 22 31 58 40', 'Cataract, Glaucoma & Refractive Surgeon', NULL)
ON CONFLICT DO NOTHING;
SELECT setval('doctors_id_seq', (SELECT MAX(id) FROM doctors));

-- PATIENTS
INSERT INTO patients (id, user_id, age, gender, blood_group, address) VALUES
(1, 4, 45, 'MALE',   'B+', 'Near Station, Ahilyanagar'),
(2, 5, 32, 'FEMALE', 'O+', 'Savedi Road, Ahilyanagar')
ON CONFLICT DO NOTHING;
SELECT setval('patients_id_seq', (SELECT MAX(id) FROM patients));

-- DOCTOR AVAILABILITY
INSERT INTO doctor_availability (doctor_id, day_of_week, start_time, end_time) VALUES
(1, 'MON', '10:00:00', '17:00:00'),
(1, 'WED', '10:00:00', '17:00:00'),
(1, 'FRI', '10:00:00', '17:00:00'),
(1, 'TUE', '09:00:00', '13:00:00'),
(1, 'THU', '09:00:00', '13:00:00'),
(1, 'SAT', '09:00:00', '13:00:00')
ON CONFLICT DO NOTHING;

-- SERVICES
INSERT INTO services (id, name, slug, short_desc, description, image_url, icon, is_active, sort_order) VALUES
(1, 'Cataract & Phaco Surgery', 'cataract-phaco-surgery', 'Micro-incision stitchless cataract surgery with premium foldable IOLs.', 'Our state-of-the-art Phacoemulsification (Phaco) procedure ensures minimal incision, faster recovery, and excellent visual outcomes. We use premium foldable IOLs including monofocal and multifocal options.', '/photos/services/cataract.jpg', 'FaEye', 1, 1),
(2, 'LASIK / Refractive Surgery', 'lasik-refractive-surgery', 'Freedom from spectacles with precise laser vision correction.', 'LASIK (Laser-Assisted In Situ Keratomileusis) is a proven procedure to correct myopia, hyperopia, and astigmatism. Our advanced laser platform ensures precise, safe, and permanent vision correction.', '/photos/services/lasik.jpg', 'FaLaser', 1, 2),
(3, 'Retina Treatment', 'retina-treatment', 'Expert diagnosis and management of all retinal disorders.', 'Comprehensive retinal care including diabetic retinopathy management, macular degeneration treatment, retinal detachment surgery, intravitreal injections, and fluorescein angiography.', '/photos/services/retina.jpg', 'FaEye', 1, 3),
(4, 'Glaucoma Treatment', 'glaucoma-treatment', 'Advanced glaucoma detection and pressure management.', 'Early detection and management of glaucoma using automated perimetry, pachymetry, and OCT. Treatment includes medication, laser therapy, and surgical intervention as required.', '/photos/services/glaucoma.jpg', 'FaEye', 1, 4),
(5, 'Cornea Treatment', 'cornea-treatment', 'Specialized care for corneal diseases and disorders.', 'Comprehensive corneal care including treatment of keratoconus, corneal ulcers, pterygium surgery, and corneal transplantation (PKP and DALK).', '/photos/services/cornea.jpg', 'FaEye', 1, 5),
(6, 'Dry Eye Treatment', 'dry-eye-treatment', 'Relief from chronic dry eye syndrome with modern therapies.', 'Diagnosis and management of dry eye disease using Schirmer test, tear film evaluation, and advanced therapies including punctal plugs and customized lubricant therapy.', '/photos/services/dry-eye.jpg', 'FaEye', 1, 6),
(7, 'Pediatric Ophthalmology', 'pediatric-ophthalmology', 'Specialized eye care for children of all ages.', 'Comprehensive eye care for children including treatment of amblyopia (lazy eye), strabismus (squint), refractive errors, and congenital eye disorders. Child-friendly, gentle approach.', '/photos/services/pediatric.jpg', 'FaBaby', 1, 7),
(8, 'Diabetic Eye Care', 'diabetic-eye-care', 'Protect your vision from diabetes-related complications.', 'Regular screening and management of diabetic eye disease. Early detection of diabetic retinopathy, macular edema, and neovascular glaucoma through advanced imaging and timely laser treatment.', '/photos/services/diabetic.jpg', 'FaEye', 1, 8),
(9, 'Eye Check-up / OPD', 'eye-checkup-opd', 'Comprehensive 12-step eye examination for all ages.', 'Complete eye evaluation including visual acuity testing, refraction, slit lamp examination, fundus examination, IOP measurement, color vision testing, and spectacle prescription.', '/photos/services/eye-checkup.jpg', 'FaEye', 1, 9),
(10, 'Contact Lens', 'contact-lens', 'Expert fitting and prescription for all types of contact lenses.', 'Contact lens evaluation, fitting, and prescription for soft, rigid gas permeable (RGP), toric, and cosmetic lenses. Including training and follow-up care.', '/photos/services/contact-lens.jpg', 'FaEye', 1, 10),
(11, 'General Ophthalmology', 'general-ophthalmology', 'Expert consultation for all general eye conditions.', 'Consultation and management of all common eye conditions including conjunctivitis, eye allergies, stye, chalazion, pterygium, lid disorders, and other ocular conditions.', '/photos/services/general.jpg', 'FaUserMd', 1, 11)
ON CONFLICT DO NOTHING;
SELECT setval('services_id_seq', (SELECT MAX(id) FROM services));

-- APPOINTMENTS (sample data)
INSERT INTO appointments (appointment_no, patient_id, doctor_id, service_id, appointment_date, appointment_time, status, symptoms, age, gender) VALUES
('APT-2026-00001', 1, 1, 1, CURRENT_DATE + INTERVAL '2 DAY', '10:00:00', 'CONFIRMED', 'Blurry vision, difficulty driving at night', 45, 'MALE'),
('APT-2026-00002', 2, 1, 9, CURRENT_DATE + INTERVAL '3 DAY', '11:00:00', 'PENDING', 'Eye strain, headaches after reading', 32, 'FEMALE')
ON CONFLICT DO NOTHING;

-- GALLERY IMAGES
INSERT INTO gallery (title, description, image_url, category, is_active, sort_order) VALUES
('Operation Theatre', 'State-of-the-art ophthalmic operation theatre', '/photos/hospital/operation-theatre.png', 'infrastructure', 1, 1),
('Consultation Room', 'Modern patient consultation rooms', '/photos/hospital/consultation-room.png', 'infrastructure', 1, 2),
('Hospital Ward', 'Comfortable and clean patient wards', '/photos/hospital/hospital-ward.png', 'infrastructure', 1, 3),
('LASIK Equipment', 'Advanced LASIK laser equipment', '/photos/services/lasik-services.png', 'equipment', 1, 4),
('Diagnostic Equipment', 'Professional diagnostic tools', '/photos/hospital/equipment-professional.png', 'equipment', 1, 5)
ON CONFLICT DO NOTHING;

-- SAMPLE REVIEWS
INSERT INTO reviews (patient_id, reviewer_name, rating, review, is_approved, source) VALUES
(1, 'Ramesh Sharma', 5, 'Excellent treatment by Dr. Borude. My cataract surgery was completely painless. Very professional staff.', 1, 'website'),
(2, 'Sunita Patil', 5, 'Dr. Borude is a wonderful doctor. Very patient and explains everything clearly. Highly recommended!', 1, 'website'),
(NULL, 'Ganesh Kulkarni', 5, 'Best eye hospital in Ahilyanagar. The cashless facility is very convenient. 100% satisfied.', 1, 'google'),
(NULL, 'Priya Deshmukh', 4, 'Very good experience. Clean facilities, knowledgeable doctors. The waiting time could be slightly shorter.', 1, 'google')
ON CONFLICT DO NOTHING;

-- EXPERIENCES
INSERT INTO experiences (doctor_id, period, institution, description, display_order) VALUES
(1, '2002 - 2004', 'तुलसी आय हॉस्पिटल, नाशिक', '', 1),
(1, '2004 - 2006', 'आनंदऋषिजी हॉस्पिटल', '', 2),
(1, '2006 - 2024', 'भैरवनाथ आय हॉस्पिटल', 'Professional eye-care service', 3)
ON CONFLICT DO NOTHING;

-- EXPERTISE
INSERT INTO expertise (title, display_order) VALUES
('Cataract Surgery', 1), ('Phaco Surgery', 2), ('Glaucoma', 3), ('Refractive Surgery', 4), ('LASIK', 5), ('Corneal Transplant', 6), ('Squint Treatment', 7), ('Retina Care', 8), ('Pediatric Eye Care', 9)
ON CONFLICT DO NOTHING;

-- LENS OPTIONS
INSERT INTO lens_options (name, display_order) VALUES
('Monofocal', 1), ('Multifocal', 2), ('Trifocal', 3), ('EDOF', 4), ('Toric', 5)
ON CONFLICT DO NOTHING;

-- LASIK DETAILS
INSERT INTO lasik_details (title, description, machine) VALUES
('LASIK & Refractive Surgery', 'चष्मा कायमस्वरूपी घालविणारे टॉपलेस, ब्लेडलेस लॅसिक शस्त्रक्रिया', 'Schwind Amaris 750S मशीनद्वारे')
ON CONFLICT DO NOTHING;

-- PATIENT CARE
INSERT INTO patient_care (instruction, display_order) VALUES
('ऑपरेशन झालेल्या डोळ्याच्या कुशीवर 8 दिवसांपर्यंत झोपू नये.', 1),
('ऑपरेशननंतर 8 दिवसांपर्यंत आंघोळ करताना डोळ्यात पाणी जाऊ देऊ नये.', 2),
('डॉक्टरांच्या सल्ल्याशिवाय पट्टी काढू नये.', 3),
('डोळे चोळू नयेत.', 4),
('डोळ्यात पाणी मारू नये.', 5),
('धूर, धूळ आणि उन्हापासून डोळ्यांचे संरक्षण करावे.', 6),
('खाली वाकून जड वस्तू उचलणे टाळावे.', 7),
('लहान मुलांना अंगावर घेऊ नये.', 8),
('तंबाखू, गुटखा, सुपारी, सिगारेट, दारू इत्यादी टाळावे.', 9),
('डोळ्याला इजा किंवा दृष्टी कमी झाल्यास त्वरित डॉक्टरांचा सल्ला घ्यावा.', 10),
('Follow your ophthalmologist''s specific post-operative instructions.', 11)
ON CONFLICT DO NOTHING;

-- MEDICINE GUIDELINES
INSERT INTO medicine_guidelines (instruction, display_order) VALUES
('डॉक्टरांच्या सल्ल्याप्रमाणे औषधे घ्यावीत.', 1),
('Eye drops वापरण्यापूर्वी हात स्वच्छ धुवावेत.', 2),
('डॉक्टरांनी सांगितलेल्या पद्धतीने drops वापरावेत.', 3),
('कोणतेही औषध स्वतःहून सुरू किंवा बंद करू नये.', 4),
('इतर आजारांची औषधे डॉक्टरांच्या सल्ल्याशिवाय बंद करू नयेत.', 5)
ON CONFLICT DO NOTHING;

-- INSURANCE PROVIDERS
INSERT INTO insurance_providers (name, type) VALUES
('Star Health Insurance', 'TPA'), ('HDFC ERGO', 'TPA'), ('ICICI Lombard', 'TPA'), ('Bajaj Allianz', 'TPA'), ('SBI General Insurance', 'TPA'), ('Reliance General', 'TPA'), ('Aditya Birla Health', 'TPA'), ('Niva Bupa (Max Bupa)', 'TPA'), ('Care Health (Religare)', 'TPA'), ('United India Insurance', 'Government'), ('New India Assurance', 'Government'), ('Oriental Insurance', 'Government'), ('National Insurance', 'Government'), ('Mahatma Jyotirao Phule Jan Arogya Yojana (MJPJAY)', 'Scheme'), ('Ayushman Bharat (PM-JAY)', 'Scheme')
ON CONFLICT DO NOTHING;
