/**
 * OCR Service - Concrete implementations
 * 
 * Tesseract.js: Free, runs locally, no API key needed.
 * Mock: Used when AI_PROVIDER=mock for UI testing without real OCR.
 */

const { createWorker } = require('tesseract.js');
const { parseExtractedText } = require('./aiService');

/**
 * Extract text using Tesseract.js (local OCR)
 */
async function extractWithTesseract(filePath, mimeType) {
  let worker;
  try {
    worker = await createWorker('eng');
    const { data } = await worker.recognize(filePath);
    const rawText = data.text || '';
    const confidence = Math.round(data.confidence || 0);
    const structured = parseExtractedText(rawText);

    return {
      rawText,
      confidence,
      provider: 'tesseract',
      ...structured,
    };
  } catch (err) {
    console.error('Tesseract OCR error:', err.message);
    // Fall back to mock on error
    return mockExtract(filePath);
  } finally {
    if (worker) await worker.terminate();
  }
}

/**
 * Mock OCR extractor — returns sample data for UI testing.
 * Used when AI_PROVIDER=mock or Tesseract fails.
 */
async function mockExtract(filePath) {
  // Simulate processing delay
  await new Promise(r => setTimeout(r, 1500));

  return {
    rawText: 'MOCK OCR OUTPUT\nPatient Name: Ramesh Kumar\nAge: 45\nGender: Male\nDoctor: Dr. R.K. Borude\nDiagnosis: Cataract (Nuclear Sclerosis Grade 2)\nSymptoms: Blurry vision, Glare, Difficulty reading\nMedicine: Tropicamide 1% Eye Drop 1 drop before surgery\nReport Date: 20/08/2026\nNotes: Pre-op evaluation done. Schedule phaco surgery.',
    patientName: 'Ramesh Kumar',
    age: '45',
    gender: 'Male',
    doctorName: 'Dr. R.K. Borude',
    diagnosis: 'Cataract (Nuclear Sclerosis Grade 2)',
    symptoms: 'Blurry vision, Glare, Difficulty reading',
    medicines: ['Tropicamide 1% Eye Drop - 1 drop before surgery'],
    prescription: 'Tropicamide 1% Eye Drop 1 drop before surgery',
    reportDate: '20/08/2026',
    notes: 'Pre-op evaluation done. Schedule phaco surgery.',
    confidence: 78,
    provider: 'mock',
  };
}

module.exports = { extractWithTesseract, mockExtract };
