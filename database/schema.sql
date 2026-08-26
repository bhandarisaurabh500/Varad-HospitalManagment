-- ============================================================
-- EYE HOSPITAL MANAGEMENT SYSTEM - DATABASE SCHEMA
-- Hospital: Varad Netralaya, Ahilyanagar
-- ============================================================

CREATE DATABASE IF NOT EXISTS eye_hospital CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE eye_hospital;

-- ============================================================
-- ROLES TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS roles (
  id        INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name      ENUM('ADMIN','DOCTOR','PATIENT') NOT NULL UNIQUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- USERS TABLE (base auth table)
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
  id           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  role_id      INT UNSIGNED NOT NULL,
  full_name    VARCHAR(150) NOT NULL,
  email        VARCHAR(191) NOT NULL UNIQUE,
  phone        VARCHAR(20),
  password     VARCHAR(255) NOT NULL,
  is_active    TINYINT(1) DEFAULT 1,
  profile_pic  VARCHAR(500),
  created_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at   DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_users_role FOREIGN KEY (role_id) REFERENCES roles(id),
  INDEX idx_users_email (email),
  INDEX idx_users_role  (role_id)
);

-- ============================================================
-- DOCTORS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS doctors (
  id                INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id           INT UNSIGNED NOT NULL UNIQUE,
  registration_no   VARCHAR(100),
  qualification     VARCHAR(255),
  specialization    VARCHAR(255),
  experience_years  INT UNSIGNED DEFAULT 0,
  about             TEXT,
  expertise         TEXT COMMENT 'JSON array of expertise areas',
  consultation_fee  DECIMAL(10,2) DEFAULT 0.00,
  photo_url         VARCHAR(500),
  is_available      TINYINT(1) DEFAULT 1,
  created_at        DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at        DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_doctors_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_doctors_user (user_id)
);

-- ============================================================
-- PATIENTS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS patients (
  id           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id      INT UNSIGNED NOT NULL UNIQUE,
  date_of_birth DATE,
  age          INT UNSIGNED,
  gender       ENUM('MALE','FEMALE','OTHER'),
  blood_group  VARCHAR(10),
  address      TEXT,
  emergency_contact VARCHAR(20),
  medical_history TEXT,
  created_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at   DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_patients_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_patients_user (user_id)
);

-- ============================================================
-- SERVICES TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS services (
  id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(255) NOT NULL,
  slug          VARCHAR(255) NOT NULL UNIQUE,
  description   TEXT,
  short_desc    VARCHAR(500),
  image_url     VARCHAR(500),
  icon          VARCHAR(100),
  is_active     TINYINT(1) DEFAULT 1,
  sort_order    INT UNSIGNED DEFAULT 0,
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_services_slug (slug)
);

-- ============================================================
-- DOCTOR AVAILABILITY TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS doctor_availability (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  doctor_id  INT UNSIGNED NOT NULL,
  day_of_week ENUM('MON','TUE','WED','THU','FRI','SAT','SUN') NOT NULL,
  start_time TIME NOT NULL,
  end_time   TIME NOT NULL,
  is_active  TINYINT(1) DEFAULT 1,
  CONSTRAINT fk_availability_doctor FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE,
  UNIQUE KEY uq_doctor_day (doctor_id, day_of_week),
  INDEX idx_availability_doctor (doctor_id)
);

-- ============================================================
-- APPOINTMENT SLOTS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS appointment_slots (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  doctor_id  INT UNSIGNED NOT NULL,
  slot_date  DATE NOT NULL,
  slot_time  TIME NOT NULL,
  is_booked  TINYINT(1) DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_slots_doctor FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE,
  UNIQUE KEY uq_slot (doctor_id, slot_date, slot_time),
  INDEX idx_slots_doctor_date (doctor_id, slot_date)
);

-- ============================================================
-- APPOINTMENTS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS appointments (
  id                INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  appointment_no    VARCHAR(20) NOT NULL UNIQUE COMMENT 'e.g. APT-2026-00001',
  patient_id        INT UNSIGNED NOT NULL,
  doctor_id         INT UNSIGNED NOT NULL,
  service_id        INT UNSIGNED,
  appointment_date  DATE NOT NULL,
  appointment_time  TIME NOT NULL,
  status            ENUM('PENDING','CONFIRMED','COMPLETED','CANCELLED','RESCHEDULED') DEFAULT 'PENDING',
  symptoms          TEXT,
  notes             TEXT,
  age               INT UNSIGNED,
  gender            ENUM('MALE','FEMALE','OTHER'),
  cancelled_reason  TEXT,
  confirmed_by      INT UNSIGNED COMMENT 'user_id of admin/doctor who confirmed',
  created_at        DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at        DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_appt_patient FOREIGN KEY (patient_id) REFERENCES patients(id),
  CONSTRAINT fk_appt_doctor  FOREIGN KEY (doctor_id)  REFERENCES doctors(id),
  CONSTRAINT fk_appt_service FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE SET NULL,
  INDEX idx_appt_patient      (patient_id),
  INDEX idx_appt_doctor       (doctor_id),
  INDEX idx_appt_date         (appointment_date),
  INDEX idx_appt_status       (status),
  INDEX idx_appt_doctor_date  (doctor_id, appointment_date, appointment_time)
);

-- ============================================================
-- MEDICAL RECORDS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS medical_records (
  id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  appointment_id  INT UNSIGNED,
  patient_id      INT UNSIGNED NOT NULL,
  doctor_id       INT UNSIGNED NOT NULL,
  visit_date      DATE NOT NULL,
  symptoms        TEXT,
  diagnosis       TEXT,
  prescription    TEXT,
  notes           TEXT,
  follow_up_date  DATE,
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_mr_appointment FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE SET NULL,
  CONSTRAINT fk_mr_patient     FOREIGN KEY (patient_id)    REFERENCES patients(id),
  CONSTRAINT fk_mr_doctor      FOREIGN KEY (doctor_id)     REFERENCES doctors(id),
  INDEX idx_mr_patient (patient_id),
  INDEX idx_mr_doctor  (doctor_id)
);

-- ============================================================
-- PRESCRIPTIONS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS prescriptions (
  id               INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  medical_record_id INT UNSIGNED NOT NULL,
  medicine_name    VARCHAR(255) NOT NULL,
  dosage           VARCHAR(100),
  frequency        VARCHAR(100),
  duration         VARCHAR(100),
  instructions     TEXT,
  created_at       DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_rx_record FOREIGN KEY (medical_record_id) REFERENCES medical_records(id) ON DELETE CASCADE,
  INDEX idx_rx_record (medical_record_id)
);

-- ============================================================
-- AI SCANS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS ai_scans (
  id                INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  scanned_by        INT UNSIGNED NOT NULL COMMENT 'user_id of admin or doctor',
  patient_id        INT UNSIGNED COMMENT 'linked after verification',
  original_file     VARCHAR(500) NOT NULL,
  file_mime         VARCHAR(100),
  raw_text          LONGTEXT,
  extracted_data    JSON COMMENT 'structured extracted fields',
  confidence        DECIMAL(5,2) DEFAULT 0,
  ai_provider       VARCHAR(100),
  is_verified       TINYINT(1) DEFAULT 0,
  verified_by       INT UNSIGNED,
  verified_at       DATETIME,
  medical_record_id INT UNSIGNED COMMENT 'linked after verification+save',
  created_at        DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_scan_user    FOREIGN KEY (scanned_by) REFERENCES users(id),
  CONSTRAINT fk_scan_patient FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE SET NULL,
  CONSTRAINT fk_scan_mr      FOREIGN KEY (medical_record_id) REFERENCES medical_records(id) ON DELETE SET NULL,
  INDEX idx_scan_user    (scanned_by),
  INDEX idx_scan_patient (patient_id)
);

-- ============================================================
-- PATIENT DOCUMENTS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS patient_documents (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  patient_id  INT UNSIGNED NOT NULL,
  scan_id     INT UNSIGNED,
  doc_type    VARCHAR(100) COMMENT 'prescription, report, referral, etc.',
  file_path   VARCHAR(500) NOT NULL,
  file_name   VARCHAR(255),
  uploaded_by INT UNSIGNED,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_doc_patient FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
  CONSTRAINT fk_doc_scan    FOREIGN KEY (scan_id)    REFERENCES ai_scans(id) ON DELETE SET NULL,
  INDEX idx_doc_patient (patient_id)
);

-- ============================================================
-- GALLERY TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS gallery (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title       VARCHAR(255),
  description TEXT,
  image_url   VARCHAR(500) NOT NULL,
  category    VARCHAR(100) DEFAULT 'general',
  is_active   TINYINT(1) DEFAULT 1,
  sort_order  INT UNSIGNED DEFAULT 0,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================================
-- REVIEWS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS reviews (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  patient_id INT UNSIGNED,
  reviewer_name VARCHAR(150),
  rating     TINYINT UNSIGNED NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review     TEXT,
  is_approved TINYINT(1) DEFAULT 0,
  source     VARCHAR(50) DEFAULT 'website' COMMENT 'website, google, etc.',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_review_patient FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE SET NULL,
  INDEX idx_reviews_approved (is_approved)
);

-- ============================================================
-- CONTACT MESSAGES TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS contact_messages (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  full_name  VARCHAR(150) NOT NULL,
  email      VARCHAR(191),
  phone      VARCHAR(20),
  subject    VARCHAR(255),
  message    TEXT NOT NULL,
  is_read    TINYINT(1) DEFAULT 0,
  replied_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_contact_read (is_read)
);

-- ============================================================
-- EQUIPMENT TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS equipment (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  short_desc TEXT,
  image_url VARCHAR(255),
  is_active BOOLEAN DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- NOTICES TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS notices (
  id INT PRIMARY KEY AUTO_INCREMENT,
  notice_text TEXT NOT NULL,
  is_active BOOLEAN DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
