-- ============================================================
-- EYE HOSPITAL MANAGEMENT SYSTEM - SEED DATA
-- ============================================================
USE eye_hospital;

-- ============================================================
-- ROLES
-- ============================================================
INSERT IGNORE INTO roles (name) VALUES ('ADMIN'), ('DOCTOR'), ('PATIENT');

-- ============================================================
-- USERS (passwords are bcrypt hash of 'Admin@123', 'Doctor@123', 'Patient@123')
-- ============================================================
INSERT IGNORE INTO users (id, role_id, full_name, email, phone, password, is_active) VALUES
(1, (SELECT id FROM roles WHERE name='ADMIN'),
 'Super Admin',
 'admin@varadnetralaya.com',
 '+91 9000000001',
 '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4oRqezpzJq',
 1),
(2, (SELECT id FROM roles WHERE name='DOCTOR'),
 'Dr. Raosaheb Kundlik Borude',
 'dr.borude@varadnetralaya.com',
 '+91 9822315840',
 '$2a$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWEwrkm',
 1),
(4, (SELECT id FROM roles WHERE name='PATIENT'),
 'Ramesh Sharma',
 'ramesh.sharma@example.com',
 '+91 9876543210',
 '$2a$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWEwrkm',
 1),
(5, (SELECT id FROM roles WHERE name='PATIENT'),
 'Sunita Patil',
 'sunita.patil@example.com',
 '+91 9876543211',
 '$2a$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWEwrkm',
 1),
(6, (SELECT id FROM roles WHERE name='PATIENT'),
 'Amit Deshmukh',
 'amit.deshmukh@example.com',
 '+91 9876543212',
 '$2a$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWEwrkm',
 1),
(7, (SELECT id FROM roles WHERE name='PATIENT'),
 'Neha Kulkarni',
 'neha.kulkarni@example.com',
 '+91 9876543213',
 '$2a$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWEwrkm',
 1),
(8, (SELECT id FROM roles WHERE name='PATIENT'),
 'Rohan Joshi',
 'rohan.joshi@example.com',
 '+91 9876543214',
 '$2a$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWEwrkm',
 1),
(9, (SELECT id FROM roles WHERE name='PATIENT'),
 'Priya Shinde',
 'priya.shinde@example.com',
 '+91 9876543215',
 '$2a$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWEwrkm',
 1),
(10, (SELECT id FROM roles WHERE name='PATIENT'),
 'Vikram Pawar',
 'vikram.pawar@example.com',
 '+91 9876543216',
 '$2a$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWEwrkm',
 1);

-- ============================================================
-- DOCTORS
-- ============================================================
INSERT IGNORE INTO doctors (user_id, registration_no, qualification, specialization, experience_years, about, expertise, consultation_fee, photo_url) VALUES
(2,
 'MH-MMC-2001-12876',
 'MBBS, DOMS, FICO',
 'Cataract, Glaucoma & Refractive Surgeon',
 22,
 'Dr. Raosaheb Kundlik Borude is a highly experienced Cataract, Glaucoma & Refractive Surgeon dedicated to providing modern, compassionate eye care.',
 '["Cataract & Phaco Surgery","LASIK Refractive Surgery","Retina & Vitreous","Glaucoma Management","Automated Perimetry","Diabetic Retinopathy","Oculoplasty"]',
 500.00,
 '/photos/doctor/dr-ravsaheb-borude-poster.jpg');

-- ============================================================
-- PATIENTS
-- ============================================================
INSERT IGNORE INTO patients (user_id, age, gender, blood_group, address) VALUES
(4, 45, 'MALE',   'B+', 'Near Station, Ahilyanagar'),
(5, 32, 'FEMALE', 'O+', 'Savedi Road, Ahilyanagar'),
(6, 28, 'MALE',   'A+', 'Bhingar, Ahilyanagar'),
(7, 35, 'FEMALE', 'AB+', 'Kedgaon, Ahilyanagar'),
(8, 42, 'MALE',   'O-', 'Nagar-Pune Road, Ahilyanagar'),
(9, 29, 'FEMALE', 'B-', 'Burudgaon Road, Ahilyanagar'),
(10, 50, 'MALE',  'O+', 'Pipeline Road, Ahilyanagar');

-- ============================================================
-- DOCTOR AVAILABILITY
-- ============================================================
INSERT IGNORE INTO doctor_availability (doctor_id, day_of_week, start_time, end_time) VALUES
-- Dr. Borude: Mon, Wed, Fri (surgery), Tue, Thu, Sat (OPD)
((SELECT id FROM doctors WHERE user_id=2), 'MON', '10:00:00', '17:00:00'),
((SELECT id FROM doctors WHERE user_id=2), 'WED', '10:00:00', '17:00:00'),
((SELECT id FROM doctors WHERE user_id=2), 'FRI', '10:00:00', '17:00:00'),
((SELECT id FROM doctors WHERE user_id=2), 'TUE', '09:00:00', '13:00:00'),
((SELECT id FROM doctors WHERE user_id=2), 'THU', '09:00:00', '13:00:00'),
((SELECT id FROM doctors WHERE user_id=2), 'SAT', '09:00:00', '13:00:00');

-- ============================================================
-- SERVICES
-- ============================================================
INSERT IGNORE INTO services (name, slug, short_desc, description, image_url, icon, is_active, sort_order) VALUES
('Cataract & Phaco Surgery', 'cataract-phaco-surgery',
 'Micro-incision stitchless cataract surgery with premium foldable IOLs.',
 'Our state-of-the-art Phacoemulsification (Phaco) procedure ensures minimal incision, faster recovery, and excellent visual outcomes. We use premium foldable IOLs including monofocal and multifocal options.',
 '/photos/services/cataract.jpg', 'FaEye', 1, 1),

('LASIK / Refractive Surgery', 'lasik-refractive-surgery',
 'Freedom from spectacles with precise laser vision correction.',
 'LASIK (Laser-Assisted In Situ Keratomileusis) is a proven procedure to correct myopia, hyperopia, and astigmatism. Our advanced laser platform ensures precise, safe, and permanent vision correction.',
 '/photos/services/lasik.jpg', 'FaLaser', 1, 2),

('Retina Treatment', 'retina-treatment',
 'Expert diagnosis and management of all retinal disorders.',
 'Comprehensive retinal care including diabetic retinopathy management, macular degeneration treatment, retinal detachment surgery, intravitreal injections, and fluorescein angiography.',
 '/photos/services/retina.jpg', 'FaEye', 1, 3),

('Glaucoma Treatment', 'glaucoma-treatment',
 'Advanced glaucoma detection and pressure management.',
 'Early detection and management of glaucoma using automated perimetry, pachymetry, and OCT. Treatment includes medication, laser therapy, and surgical intervention as required.',
 '/photos/services/glaucoma.jpg', 'FaEye', 1, 4),

('Cornea Treatment', 'cornea-treatment',
 'Specialized care for corneal diseases and disorders.',
 'Comprehensive corneal care including treatment of keratoconus, corneal ulcers, pterygium surgery, and corneal transplantation (PKP and DALK).',
 '/photos/services/cornea.jpg', 'FaEye', 1, 5),

('Dry Eye Treatment', 'dry-eye-treatment',
 'Relief from chronic dry eye syndrome with modern therapies.',
 'Diagnosis and management of dry eye disease using Schirmer test, tear film evaluation, and advanced therapies including punctal plugs and customized lubricant therapy.',
 '/photos/services/dry-eye.jpg', 'FaEye', 1, 6),

('Pediatric Ophthalmology', 'pediatric-ophthalmology',
 'Specialized eye care for children of all ages.',
 'Comprehensive eye care for children including treatment of amblyopia (lazy eye), strabismus (squint), refractive errors, and congenital eye disorders. Child-friendly, gentle approach.',
 '/photos/services/pediatric.jpg', 'FaBaby', 1, 7),

('Diabetic Eye Care', 'diabetic-eye-care',
 'Protect your vision from diabetes-related complications.',
 'Regular screening and management of diabetic eye disease. Early detection of diabetic retinopathy, macular edema, and neovascular glaucoma through advanced imaging and timely laser treatment.',
 '/photos/services/diabetic.jpg', 'FaEye', 1, 8),

('Eye Check-up / OPD', 'eye-checkup-opd',
 'Comprehensive 12-step eye examination for all ages.',
 'Complete eye evaluation including visual acuity testing, refraction, slit lamp examination, fundus examination, IOP measurement, color vision testing, and spectacle prescription.',
 '/photos/services/eye-checkup.jpg', 'FaEye', 1, 9),

('Contact Lens', 'contact-lens',
 'Expert fitting and prescription for all types of contact lenses.',
 'Contact lens evaluation, fitting, and prescription for soft, rigid gas permeable (RGP), toric, and cosmetic lenses. Including training and follow-up care.',
 '/photos/services/contact-lens.jpg', 'FaEye', 1, 10),

('General Ophthalmology', 'general-ophthalmology',
 'Expert consultation for all general eye conditions.',
 'Consultation and management of all common eye conditions including conjunctivitis, eye allergies, stye, chalazion, pterygium, lid disorders, and other ocular conditions.',
 '/photos/services/general.jpg', 'FaUserMd', 1, 11);

-- ============================================================
-- APPOINTMENTS (sample data)
-- ============================================================
INSERT IGNORE INTO appointments
  (appointment_no, patient_id, doctor_id, service_id, appointment_date, appointment_time, status, symptoms, age, gender)
VALUES
('APT-2026-00001',
 (SELECT id FROM patients WHERE user_id=4),
 (SELECT id FROM doctors WHERE user_id=2),
 (SELECT id FROM services WHERE slug='cataract-phaco-surgery'),
 DATE_ADD(CURDATE(), INTERVAL 2 DAY), '10:00:00',
 'CONFIRMED', 'Blurry vision, difficulty driving at night', 45, 'MALE'),

('APT-2026-00002',
 (SELECT id FROM patients WHERE user_id=5),
 (SELECT id FROM doctors WHERE user_id=2),
 (SELECT id FROM services WHERE slug='eye-checkup-opd'),
 DATE_ADD(CURDATE(), INTERVAL 3 DAY), '11:00:00',
 'PENDING', 'Eye strain, headaches after reading', 32, 'FEMALE');

-- ============================================================
-- GALLERY IMAGES
-- ============================================================
INSERT IGNORE INTO gallery (title, description, image_url, category, is_active, sort_order) VALUES
('Operation Theatre', 'State-of-the-art ophthalmic operation theatre', '/photos/hospital/operation-theatre.png', 'infrastructure', 1, 1),
('Consultation Room', 'Modern patient consultation rooms', '/photos/hospital/consultation-room.png', 'infrastructure', 1, 2),
('Hospital Ward', 'Comfortable and clean patient wards', '/photos/hospital/hospital-ward.png', 'infrastructure', 1, 3),
('LASIK Equipment', 'Advanced LASIK laser equipment', '/photos/services/lasik-services.png', 'equipment', 1, 4),
('Diagnostic Equipment', 'Professional diagnostic tools', '/photos/hospital/equipment-professional.png', 'equipment', 1, 5);

-- ============================================================
-- SAMPLE REVIEWS
-- ============================================================
INSERT IGNORE INTO reviews (patient_id, reviewer_name, rating, review, is_approved, source) VALUES
((SELECT id FROM patients WHERE user_id=4), 'Ramesh Sharma', 5,
 'Excellent treatment by Dr. Borude. My cataract surgery was completely painless. Very professional staff.', 1, 'website'),
((SELECT id FROM patients WHERE user_id=5), 'Sunita Patil', 5,
 'Dr. Borude is a wonderful doctor. Very patient and explains everything clearly. Highly recommended!', 1, 'website'),
(NULL, 'Ganesh Kulkarni', 5,
 'Best eye hospital in Ahilyanagar. The cashless facility is very convenient. 100% satisfied.', 1, 'google'),
(NULL, 'Priya Deshmukh', 4,
 'Very good experience. Clean facilities, knowledgeable doctors. The waiting time could be slightly shorter.', 1, 'google');

-- ============================================================
-- DEMO CREDENTIALS SUMMARY
-- Admin:   admin@varadnetralaya.com    / Admin@123
-- Doctor:  dr.borude@varadnetralaya.com/ Doctor@123
-- Patient: ramesh.sharma@example.com   / Patient@123
-- ============================================================
