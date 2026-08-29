const multer = require('multer');
const path = require('path');
const fs = require('fs');

const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
const MAX_SIZE_MB = parseInt(process.env.MAX_FILE_SIZE_MB || '5');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// ── Memory Storage for Cloud Uploads (Supabase)
const storage = multer.memoryStorage();


const fileFilter = (req, file, cb) => {
  if (ALLOWED_MIME.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPG, PNG, and PDF are allowed.'), false);
  }
};

const limits = { fileSize: MAX_SIZE_MB * 1024 * 1024 };

const uploadDocument   = multer({ storage, fileFilter, limits });
const uploadMedical    = multer({ storage, fileFilter, limits });

module.exports = { uploadDocument, uploadMedical };
