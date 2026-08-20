USE eye_hospital;

-- Update Doctor Profile to store CMS details
ALTER TABLE doctors 
ADD COLUMN opd_days VARCHAR(255) DEFAULT 'Tue, Thu, Sat',
ADD COLUMN operation_days VARCHAR(255) DEFAULT 'Mon, Wed, Fri',
ADD COLUMN contact_phone VARCHAR(50) DEFAULT '9822315840',
ADD COLUMN designation VARCHAR(255) DEFAULT 'Cataract, Glaucoma & Refractive Surgeon',
ADD COLUMN intro_text TEXT;

-- Experience Table
CREATE TABLE IF NOT EXISTS experiences (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  doctor_id INT UNSIGNED NOT NULL,
  period VARCHAR(100) NOT NULL,
  institution VARCHAR(255) NOT NULL,
  description TEXT,
  display_order INT UNSIGNED DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_exp_doc FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE
);

-- Expertise Table
CREATE TABLE IF NOT EXISTS expertise (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(100),
  is_active TINYINT(1) DEFAULT 1,
  display_order INT UNSIGNED DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Lens Options Table
CREATE TABLE IF NOT EXISTS lens_options (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  is_active TINYINT(1) DEFAULT 1,
  display_order INT UNSIGNED DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Lasik Details (Single Record typically)
CREATE TABLE IF NOT EXISTS lasik_details (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  machine VARCHAR(255),
  features TEXT, -- JSON or Text
  image_url VARCHAR(500),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Patient Care Guidelines
CREATE TABLE IF NOT EXISTS patient_care (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  instruction TEXT NOT NULL,
  is_active TINYINT(1) DEFAULT 1,
  display_order INT UNSIGNED DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Medicine Guidelines
CREATE TABLE IF NOT EXISTS medicine_guidelines (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  instruction TEXT NOT NULL,
  is_active TINYINT(1) DEFAULT 1,
  display_order INT UNSIGNED DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insurance Providers
CREATE TABLE IF NOT EXISTS insurance_providers (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(100),
  logo_url VARCHAR(500),
  is_active TINYINT(1) DEFAULT 1,
  display_order INT UNSIGNED DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Procedure Records (Admin Only)
CREATE TABLE IF NOT EXISTS procedure_records (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  patient_name VARCHAR(150) NOT NULL,
  procedure_date DATE NOT NULL,
  procedure_name VARCHAR(255) NOT NULL,
  notes TEXT,
  status ENUM('PLANNED', 'COMPLETED', 'CANCELLED') DEFAULT 'PLANNED',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Photos / Gallery CMS
CREATE TABLE IF NOT EXISTS photos (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  file_path VARCHAR(500) NOT NULL,
  category VARCHAR(100) DEFAULT 'general',
  uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
