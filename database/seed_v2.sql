USE eye_hospital;

-- Update Doctor Profile
UPDATE doctors SET 
  opd_days = 'मंगळवार • गुरुवार • शनिवार',
  operation_days = 'सोमवार • बुधवार • शुक्रवार',
  contact_phone = '98 22 31 58 40',
  qualification = 'M.B.B.S., D.O.M.S., F.I.G.O.',
  specialization = 'Ophthalmology – Pune University',
  designation = 'Cataract, Glaucoma & Refractive Surgeon',
  about = 'Fellowship in General Ophthalmology & Phacosurgery'
WHERE user_id = 1; -- Assuming Admin/Doctor is user 1. We will insert later if needed.

-- Experiences
INSERT INTO experiences (doctor_id, period, institution, description, display_order) VALUES
(1, '2002 - 2004', 'तुलसी आय हॉस्पिटल, नाशिक', '', 1),
(1, '2004 - 2006', 'आनंदऋषिजी हॉस्पिटल', '', 2),
(1, '2006 - 2024', 'भैरवनाथ आय हॉस्पिटल', 'Professional eye-care service', 3);

-- Expertise
INSERT INTO expertise (title, display_order) VALUES
('Cataract Surgery', 1),
('Phaco Surgery', 2),
('Glaucoma', 3),
('Refractive Surgery', 4),
('LASIK', 5),
('Corneal Transplant', 6),
('Squint Treatment', 7),
('Retina Care', 8),
('Pediatric Eye Care', 9);

-- Lens Options
INSERT INTO lens_options (name, display_order) VALUES
('Monofocal', 1),
('Multifocal', 2),
('Trifocal', 3),
('EDOF', 4),
('Toric', 5);

-- LASIK Details
INSERT INTO lasik_details (title, description, machine) VALUES
('LASIK & Refractive Surgery', 'चष्मा कायमस्वरूपी घालविणारे टॉपलेस, ब्लेडलेस लॅसिक शस्त्रक्रिया', 'Schwind Amaris 750S मशीनद्वारे');

-- Patient Care
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
('Follow your ophthalmologist''s specific post-operative instructions.', 11);

-- Medicine Guidelines
INSERT INTO medicine_guidelines (instruction, display_order) VALUES
('डॉक्टरांच्या सल्ल्याप्रमाणे औषधे घ्यावीत.', 1),
('Eye drops वापरण्यापूर्वी हात स्वच्छ धुवावेत.', 2),
('डॉक्टरांनी सांगितलेल्या पद्धतीने drops वापरावेत.', 3),
('कोणतेही औषध स्वतःहून सुरू किंवा बंद करू नये.', 4),
('इतर आजारांची औषधे डॉक्टरांच्या सल्ल्याशिवाय बंद करू नयेत.', 5);

-- Insurance Providers
INSERT INTO insurance_providers (name, type) VALUES
('Star Health Insurance', 'TPA'),
('HDFC ERGO', 'TPA'),
('ICICI Lombard', 'TPA'),
('Bajaj Allianz', 'TPA'),
('SBI General Insurance', 'TPA'),
('Reliance General', 'TPA'),
('Aditya Birla Health', 'TPA'),
('Niva Bupa (Max Bupa)', 'TPA'),
('Care Health (Religare)', 'TPA'),
('United India Insurance', 'Government'),
('New India Assurance', 'Government'),
('Oriental Insurance', 'Government'),
('National Insurance', 'Government'),
('Mahatma Jyotirao Phule Jan Arogya Yojana (MJPJAY)', 'Scheme'),
('Ayushman Bharat (PM-JAY)', 'Scheme');
