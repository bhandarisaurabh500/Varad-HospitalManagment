const { pool } = require('../config/db');

exports.getProviders = async (req, res) => {
  try {
    const [providers] = await pool.execute('SELECT * FROM tpa_providers ORDER BY provider_name ASC');
    res.json({ success: true, providers });
  } catch (error) {
    console.error('Error fetching providers:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.addProvider = async (req, res) => {
  const { provider_name, contact_email, contact_phone } = req.body;
  try {
    const [result] = await pool.execute(
      'INSERT INTO tpa_providers (provider_name, contact_email, contact_phone) VALUES (?, ?, ?)',
      [provider_name, contact_email, contact_phone]
    );
    res.status(201).json({ success: true, providerId: result.insertId });
  } catch (error) {
    console.error('Error adding provider:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getPatientPolicies = async (req, res) => {
  const { patientId } = req.params;
  try {
    const [policies] = await pool.execute(
      `SELECT pi.*, p.provider_name 
       FROM tpa_patient_insurance pi 
       JOIN tpa_providers p ON pi.provider_id = p.id 
       WHERE pi.patient_id = ?`,
      [patientId]
    );
    res.json({ success: true, policies });
  } catch (error) {
    console.error('Error fetching policies:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.addPatientPolicy = async (req, res) => {
  const { patient_id, provider_id, policy_number, expiry_date } = req.body;
  try {
    const [result] = await pool.execute(
      `INSERT INTO tpa_patient_insurance (patient_id, provider_id, policy_number, expiry_date) 
       VALUES (?, ?, ?, ?)
       ON CONFLICT (patient_id, provider_id) DO UPDATE SET policy_number = EXCLUDED.policy_number, expiry_date = EXCLUDED.expiry_date`,
      [patient_id, provider_id, policy_number, expiry_date]
    );
    res.status(201).json({ success: true, message: 'Policy added/updated successfully' });
  } catch (error) {
    console.error('Error adding policy:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getAllClaims = async (req, res) => {
  try {
    const [claims] = await pool.execute(`
      SELECT c.*, p.patient_uid, u.full_name as patient_name, ip.provider_name
      FROM tpa_claims c
      JOIN patients p ON c.patient_id = p.id
      JOIN users u ON p.user_id = u.id
      JOIN tpa_providers ip ON c.provider_id = ip.id
      ORDER BY c.claim_date DESC
    `);
    res.json({ success: true, claims });
  } catch (error) {
    console.error('Error fetching claims:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.submitClaim = async (req, res) => {
  const { patient_id, provider_id, appointment_id, amount_claimed, claim_date, notes } = req.body;
  const claim_uid = `CLM-${Date.now()}`;
  try {
    const [result] = await pool.execute(
      `INSERT INTO tpa_claims (claim_uid, patient_id, provider_id, appointment_id, amount_claimed, claim_date, notes) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [claim_uid, patient_id, provider_id, appointment_id, amount_claimed, claim_date, notes]
    );
    res.status(201).json({ success: true, claimId: result.insertId, claimUid: claim_uid });
  } catch (error) {
    console.error('Error submitting claim:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.updateClaimStatus = async (req, res) => {
  const { id } = req.params;
  const { status, amount_approved } = req.body;
  try {
    await pool.execute(
      `UPDATE tpa_claims SET status = ?, amount_approved = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      [status, amount_approved || 0, id]
    );
    res.json({ success: true, message: 'Claim updated successfully' });
  } catch (error) {
    console.error('Error updating claim:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
