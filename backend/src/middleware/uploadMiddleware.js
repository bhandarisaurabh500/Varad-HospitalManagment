const multer = require('multer');
const path = require('path');
const fs = require('fs');

const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
const MAX_SIZE_MB = parseInt(process.env.MAX_FILE_SIZE_MB || '5');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// ── Document uploads (AI scanner, patient docs)
const documentStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dest = path.join(__dirname, '../../uploads/documents');
    ensureDir(dest);
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e6)}`;
    cb(null, `scan-${unique}${path.extname(file.originalname)}`);
  },
});

// ── Medical record uploads
const medicalStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dest = path.join(__dirname, '../../uploads/medical-records');
    ensureDir(dest);
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e6)}`;
    cb(null, `record-${unique}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (ALLOWED_MIME.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPG, PNG, and PDF are allowed.'), false);
  }
};

const limits = { fileSize: MAX_SIZE_MB * 1024 * 1024 };

const uploadDocument   = multer({ storage: documentStorage,  fileFilter, limits });
const uploadMedical    = multer({ storage: medicalStorage,   fileFilter, limits });

module.exports = { uploadDocument, uploadMedical };
