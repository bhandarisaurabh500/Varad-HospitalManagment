-- ============================================================
-- EYE HOSPITAL MANAGEMENT SYSTEM - POSTGRESQL SCHEMA
-- ============================================================

-- ROLES TABLE
CREATE TABLE IF NOT EXISTS roles (
  id        SERIAL PRIMARY KEY,
  name      VARCHAR(50) NOT NULL UNIQUE CHECK (name IN ('ADMIN','DOCTOR','PATIENT')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- USERS TABLE
CREATE TABLE IF NOT EXISTS users (
  id           SERIAL PRIMARY KEY,
  role_id      INTEGER NOT NULL REFERENCES roles(id),
  full_name    VARCHAR(150) NOT NULL,
  email        VARCHAR(191) NOT NULL UNIQUE,
  phone        VARCHAR(20),
  password     VARCHAR(255) NOT NULL,
  is_active    SMALLINT DEFAULT 1,
  profile_pic  VARCHAR(500),
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_users_email ON users (email);
CREATE INDEX idx_users_role ON users (role_id);

-- DOCTORS TABLE
CREATE TABLE IF NOT EXISTS doctors (
  id                SERIAL PRIMARY KEY,
  user_id           INTEGER NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  registration_no   VARCHAR(100),
  qualification     VARCHAR(255),
  specialization    VARCHAR(255),
  experience_years  INTEGER DEFAULT 0,
  about             TEXT,
  expertise         TEXT,
  consultation_fee  DECIMAL(10,2) DEFAULT 0.00,
  photo_url         VARCHAR(500),
  is_available      SMALLINT DEFAULT 1,
  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  opd_days          VARCHAR(255) DEFAULT 'Tue, Thu, Sat',
  operation_days    VARCHAR(255) DEFAULT 'Mon, Wed, Fri',
  contact_phone     VARCHAR(50) DEFAULT '9822315840',
  designation       VARCHAR(255) DEFAULT 'Cataract, Glaucoma & Refractive Surgeon',
  intro_text        TEXT
);
CREATE INDEX idx_doctors_user ON doctors (user_id);

-- PATIENTS TABLE
CREATE TABLE IF NOT EXISTS patients (
  id           SERIAL PRIMARY KEY,
  user_id      INTEGER NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  date_of_birth DATE,
  age          INTEGER,
  gender       VARCHAR(20) CHECK (gender IN ('MALE','FEMALE','OTHER')),
  blood_group  VARCHAR(10),
  address      TEXT,
  emergency_contact VARCHAR(20),
  medical_history TEXT,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_patients_user ON patients (user_id);

-- SERVICES TABLE
CREATE TABLE IF NOT EXISTS services (
  id            SERIAL PRIMARY KEY,
  name          VARCHAR(255) NOT NULL,
  slug          VARCHAR(255) NOT NULL UNIQUE,
  description   TEXT,
  short_desc    VARCHAR(500),
  image_url     VARCHAR(500),
  icon          VARCHAR(100),
  is_active     SMALLINT DEFAULT 1,
  sort_order    INTEGER DEFAULT 0,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_services_slug ON services (slug);

-- DOCTOR AVAILABILITY TABLE
CREATE TABLE IF NOT EXISTS doctor_availability (
  id         SERIAL PRIMARY KEY,
  doctor_id  INTEGER NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
  day_of_week VARCHAR(3) NOT NULL CHECK (day_of_week IN ('MON','TUE','WED','THU','FRI','SAT','SUN')),
  start_time TIME NOT NULL,
  end_time   TIME NOT NULL,
  is_active  SMALLINT DEFAULT 1,
  UNIQUE (doctor_id, day_of_week)
);
CREATE INDEX idx_availability_doctor ON doctor_availability (doctor_id);

-- APPOINTMENT SLOTS TABLE
CREATE TABLE IF NOT EXISTS appointment_slots (
  id         SERIAL PRIMARY KEY,
  doctor_id  INTEGER NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
  slot_date  DATE NOT NULL,
  slot_time  TIME NOT NULL,
  is_booked  SMALLINT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (doctor_id, slot_date, slot_time)
);
CREATE INDEX idx_slots_doctor_date ON appointment_slots (doctor_id, slot_date);

-- APPOINTMENTS TABLE
CREATE TABLE IF NOT EXISTS appointments (
  id                SERIAL PRIMARY KEY,
  appointment_no    VARCHAR(20) NOT NULL UNIQUE,
  patient_id        INTEGER NOT NULL REFERENCES patients(id),
  doctor_id         INTEGER NOT NULL REFERENCES doctors(id),
  service_id        INTEGER REFERENCES services(id) ON DELETE SET NULL,
  appointment_date  DATE NOT NULL,
  appointment_time  TIME NOT NULL,
  status            VARCHAR(20) DEFAULT 'PENDING' CHECK (status IN ('PENDING','CONFIRMED','COMPLETED','CANCELLED','RESCHEDULED')),
  symptoms          TEXT,
  notes             TEXT,
  age               INTEGER,
  gender            VARCHAR(20) CHECK (gender IN ('MALE','FEMALE','OTHER')),
  cancelled_reason  TEXT,
  confirmed_by      INTEGER,
  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_appt_patient ON appointments (patient_id);
CREATE INDEX idx_appt_doctor ON appointments (doctor_id);
CREATE INDEX idx_appt_date ON appointments (appointment_date);
CREATE INDEX idx_appt_status ON appointments (status);
CREATE INDEX idx_appt_doctor_date ON appointments (doctor_id, appointment_date, appointment_time);

-- MEDICAL RECORDS TABLE
CREATE TABLE IF NOT EXISTS medical_records (
  id              SERIAL PRIMARY KEY,
  appointment_id  INTEGER REFERENCES appointments(id) ON DELETE SET NULL,
  patient_id      INTEGER NOT NULL REFERENCES patients(id),
  doctor_id       INTEGER NOT NULL REFERENCES doctors(id),
  visit_date      DATE NOT NULL,
  symptoms        TEXT,
  diagnosis       TEXT,
  prescription    TEXT,
  notes           TEXT,
  follow_up_date  DATE,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_mr_patient ON medical_records (patient_id);
CREATE INDEX idx_mr_doctor ON medical_records (doctor_id);

-- PRESCRIPTIONS TABLE
CREATE TABLE IF NOT EXISTS prescriptions (
  id               SERIAL PRIMARY KEY,
  medical_record_id INTEGER NOT NULL REFERENCES medical_records(id) ON DELETE CASCADE,
  medicine_name    VARCHAR(255) NOT NULL,
  dosage           VARCHAR(100),
  frequency        VARCHAR(100),
  duration         VARCHAR(100),
  instructions     TEXT,
  created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_rx_record ON prescriptions (medical_record_id);

-- AI SCANS TABLE
CREATE TABLE IF NOT EXISTS ai_scans (
  id                SERIAL PRIMARY KEY,
  scanned_by        INTEGER NOT NULL REFERENCES users(id),
  patient_id        INTEGER REFERENCES patients(id) ON DELETE SET NULL,
  original_file     VARCHAR(500) NOT NULL,
  file_mime         VARCHAR(100),
  raw_text          TEXT,
  extracted_data    JSONB,
  confidence        DECIMAL(5,2) DEFAULT 0,
  ai_provider       VARCHAR(100),
  is_verified       SMALLINT DEFAULT 0,
  verified_by       INTEGER,
  verified_at       TIMESTAMP,
  medical_record_id INTEGER REFERENCES medical_records(id) ON DELETE SET NULL,
  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_scan_user ON ai_scans (scanned_by);
CREATE INDEX idx_scan_patient ON ai_scans (patient_id);

-- PATIENT DOCUMENTS TABLE
CREATE TABLE IF NOT EXISTS patient_documents (
  id          SERIAL PRIMARY KEY,
  patient_id  INTEGER NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  scan_id     INTEGER REFERENCES ai_scans(id) ON DELETE SET NULL,
  doc_type    VARCHAR(100),
  file_path   VARCHAR(500) NOT NULL,
  file_name   VARCHAR(255),
  uploaded_by INTEGER,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_doc_patient ON patient_documents (patient_id);

-- GALLERY TABLE
CREATE TABLE IF NOT EXISTS gallery (
  id          SERIAL PRIMARY KEY,
  title       VARCHAR(255),
  description TEXT,
  image_url   VARCHAR(500) NOT NULL,
  category    VARCHAR(100) DEFAULT 'general',
  is_active   SMALLINT DEFAULT 1,
  sort_order  INTEGER DEFAULT 0,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- REVIEWS TABLE
CREATE TABLE IF NOT EXISTS reviews (
  id         SERIAL PRIMARY KEY,
  patient_id INTEGER REFERENCES patients(id) ON DELETE SET NULL,
  reviewer_name VARCHAR(150),
  rating     SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review     TEXT,
  is_approved SMALLINT DEFAULT 0,
  source     VARCHAR(50) DEFAULT 'website',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_reviews_approved ON reviews (is_approved);

-- CONTACT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS contact_messages (
  id         SERIAL PRIMARY KEY,
  full_name  VARCHAR(150) NOT NULL,
  email      VARCHAR(191),
  phone      VARCHAR(20),
  subject    VARCHAR(255),
  message    TEXT NOT NULL,
  is_read    SMALLINT DEFAULT 0,
  replied_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_contact_read ON contact_messages (is_read);

-- V2 TABLES
CREATE TABLE IF NOT EXISTS experiences (
  id SERIAL PRIMARY KEY,
  doctor_id INTEGER NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
  period VARCHAR(100) NOT NULL,
  institution VARCHAR(255) NOT NULL,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS expertise (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(100),
  is_active SMALLINT DEFAULT 1,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS lens_options (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  is_active SMALLINT DEFAULT 1,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS lasik_details (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  machine VARCHAR(255),
  features TEXT,
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS patient_care (
  id SERIAL PRIMARY KEY,
  instruction TEXT NOT NULL,
  is_active SMALLINT DEFAULT 1,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS medicine_guidelines (
  id SERIAL PRIMARY KEY,
  instruction TEXT NOT NULL,
  is_active SMALLINT DEFAULT 1,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS insurance_providers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(100),
  logo_url VARCHAR(500),
  is_active SMALLINT DEFAULT 1,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS procedure_records (
  id SERIAL PRIMARY KEY,
  patient_name VARCHAR(150) NOT NULL,
  procedure_date DATE NOT NULL,
  procedure_name VARCHAR(255) NOT NULL,
  notes TEXT,
  status VARCHAR(50) DEFAULT 'PLANNED' CHECK (status IN ('PLANNED', 'COMPLETED', 'CANCELLED')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS photos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  file_path VARCHAR(500) NOT NULL,
  category VARCHAR(100) DEFAULT 'general',
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
