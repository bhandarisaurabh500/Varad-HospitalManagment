const path = require('path');
const { pool } = require('../config/db');
const { scanDocument } = require('../services/ai/aiService');

/** POST /api/ai/scan-document */
async function scanDocumentHandler(req, res, next) {
  try {
    if (!req.file) {
      return res.status(422).json({ success: false, message: 'No file uploaded.' });
    }

    const filePath = req.file.path;
    const mimeType = req.file.mimetype;
    const originalName = req.file.originalname;

    // Run OCR / AI extraction
    const extracted = await scanDocument(filePath, mimeType);

    // Store scan record in DB (NOT verified yet)
    const storedPath = `/uploads/documents/${req.file.filename}`;
    const [result] = await pool.execute(
      `INSERT INTO ai_scans (scanned_by, original_file, file_mime, raw_text, extracted_data, confidence, ai_provider, is_verified)
       VALUES (?,?,?,?,?,?,?,0)`,
      [
        req.user.id,
        storedPath,
        mimeType,
        extracted.rawText,
        JSON.stringify(extracted),
        extracted.confidence || 0,
        extracted.provider || 'unknown',
      ]
    );

    return res.json({
      success: true,
      message: 'Document scanned successfully. Please verify the extracted information.',
      data: {
        scanId: result.insertId,
        rawText:      extracted.rawText,
        patientName:  extracted.patientName  || '',
        age:          extracted.age          || '',
        gender:       extracted.gender       || '',
        doctorName:   extracted.doctorName   || '',
        diagnosis:    extracted.diagnosis    || '',
        symptoms:     extracted.symptoms     || '',
        medicines:    extracted.medicines    || [],
        prescription: extracted.prescription || '',
        reportDate:   extracted.reportDate   || '',
        notes:        extracted.notes        || '',
        confidence:   extracted.confidence   || 0,
        provider:     extracted.provider     || 'unknown',
      },
      requiresVerification: true,
    });
  } catch (err) {
    next(err);
  }
}

/** POST /api/ai/verify-scan - Save after doctor/admin confirms */
async function verifyScan(req, res, next) {
  try {
    const { scanId, patientId, verifiedData } = req.body;

    if (!scanId || !verifiedData) {
      return res.status(422).json({ success: false, message: 'scanId and verifiedData are required.' });
    }

    // Update scan as verified
    await pool.execute(
      `UPDATE ai_scans SET
         is_verified=1, verified_by=?, verified_at=NOW(),
         extracted_data=?, patient_id=?
       WHERE id=?`,
      [req.user.id, JSON.stringify(verifiedData), patientId || null, scanId]
    );

    // Optionally create a medical record from the verified data
    let medicalRecordId = null;
    if (patientId && verifiedData.diagnosis) {
      const [drRows] = await pool.execute('SELECT id FROM doctors WHERE user_id=?', [req.user.id]);
      const doctorId = drRows.length ? drRows[0].id : null;

      if (doctorId) {
        const visitDate = verifiedData.reportDate
          ? new Date(verifiedData.reportDate).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0];

        const [mrResult] = await pool.execute(
          `INSERT INTO medical_records (patient_id, doctor_id, visit_date, symptoms, diagnosis, prescription, notes)
           VALUES (?,?,?,?,?,?,?)`,
          [
            patientId, doctorId, visitDate,
            verifiedData.symptoms    || null,
            verifiedData.diagnosis   || null,
            verifiedData.prescription || null,
            verifiedData.notes       || null,
          ]
        );
        medicalRecordId = mrResult.insertId;

        await pool.execute(
          'UPDATE ai_scans SET medical_record_id=? WHERE id=?',
          [medicalRecordId, scanId]
        );
      }
    }

    return res.json({
      success: true,
      message: 'Scan verified and saved successfully.',
      data: { scanId, medicalRecordId },
    });
  } catch (err) {
    next(err);
  }
}

/** GET /api/ai/scans/:id */
async function getScanById(req, res, next) {
  try {
    const [rows] = await pool.execute(
      `SELECT s.*, u.full_name AS scanned_by_name
       FROM ai_scans s JOIN users u ON u.id = s.scanned_by
       WHERE s.id=?`,
      [req.params.id]
    );
    if (!rows.length) return res.status(404).json({ success: false, message: 'Scan not found.' });
    const scan = rows[0];
    scan.extracted_data = tryParse(scan.extracted_data);
    return res.json({ success: true, data: scan });
  } catch (err) { next(err); }
}

function tryParse(val) {
  try { return JSON.parse(val); } catch { return val; }
}

module.exports = { scanDocumentHandler, verifyScan, getScanById };
