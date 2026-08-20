/**
 * AI Service Abstraction Layer
 * Reads AI_PROVIDER env variable and delegates to the correct provider.
 * Supported providers: tesseract (default), mock
 * Future providers: google-vision, aws-textract, azure-cv
 */

const ocrService = require('./ocrService');

/**
 * Scan a document file and extract structured medical information.
 * @param {string} filePath - Absolute path to the uploaded file
 * @param {string} mimeType - MIME type of the file
 * @returns {Promise<Object>} Extracted data object
 */
async function scanDocument(filePath, mimeType) {
  const provider = (process.env.AI_PROVIDER || 'tesseract').toLowerCase();

  switch (provider) {
    case 'tesseract':
      return await ocrService.extractWithTesseract(filePath, mimeType);

    case 'mock':
    default:
      return await ocrService.mockExtract(filePath);
  }
}

/**
 * Parse raw OCR text into structured medical fields.
 * @param {string} rawText
 * @returns {Object}
 */
function parseExtractedText(rawText) {
  const text = rawText || '';

  const get = (patterns) => {
    for (const p of patterns) {
      const m = text.match(p);
      if (m && m[1]) return m[1].trim();
    }
    return '';
  };

  return {
    patientName:  get([/patient\s*name\s*[:\-]?\s*(.+)/i, /name\s*[:\-]?\s*(.+)/i]),
    age:          get([/age\s*[:\-]?\s*(\d+)/i]),
    gender:       get([/gender\s*[:\-]?\s*(male|female|other)/i, /sex\s*[:\-]?\s*(male|female|other)/i]),
    doctorName:   get([/dr\.?\s*(.+)/i, /doctor\s*[:\-]?\s*(.+)/i, /physician\s*[:\-]?\s*(.+)/i]),
    diagnosis:    get([/diagnosis\s*[:\-]?\s*(.+)/i, /impression\s*[:\-]?\s*(.+)/i]),
    symptoms:     get([/symptoms?\s*[:\-]?\s*(.+)/i, /complaints?\s*[:\-]?\s*(.+)/i]),
    medicines:    parseMedicines(text),
    prescription: get([/prescription\s*[:\-]?\s*(.+)/i, /rx\s*[:\-]?\s*(.+)/i]),
    reportDate:   get([/date\s*[:\-]?\s*(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/i, /report\s*date\s*[:\-]?\s*(.+)/i]),
    notes:        get([/notes?\s*[:\-]?\s*(.+)/i, /remarks?\s*[:\-]?\s*(.+)/i, /advice\s*[:\-]?\s*(.+)/i]),
  };
}

function parseMedicines(text) {
  const lines = text.split('\n').filter(l => l.trim());
  const medicineLine = lines.find(l => /tablet|capsule|syrup|drop|oint|mg|ml|rx/i.test(l));
  if (medicineLine) return [medicineLine.trim()];
  return [];
}

module.exports = { scanDocument, parseExtractedText };
