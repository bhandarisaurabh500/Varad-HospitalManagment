const { pool } = require('../config/db');

async function saveLead(req, res, next) {
  try {
    const { patient_name, phone, email, form_data } = req.body;
    
    if (!phone) {
      return res.status(400).json({ success: false, message: 'Phone is required for a lead.' });
    }

    // Check if a lead with this phone already exists
    const [existing] = await pool.execute('SELECT * FROM partial_leads WHERE phone = ?', [phone]);
    
    if (existing && existing.length > 0) {
      // Update existing lead
      await pool.execute(
        'UPDATE partial_leads SET patient_name = ?, email = ?, form_data = ?, updated_at = CURRENT_TIMESTAMP WHERE phone = ?',
        [patient_name, email, JSON.stringify(form_data), phone]
      );
      return res.json({ success: true, message: 'Lead updated successfully.' });
    } else {
      // Create new lead
      await pool.execute(
        'INSERT INTO partial_leads (patient_name, phone, email, form_data) VALUES (?, ?, ?, ?)',
        [patient_name, phone, email, JSON.stringify(form_data)]
      );
      return res.status(201).json({ success: true, message: 'Lead created successfully.' });
    }
  } catch (err) {
    next(err);
  }
}

async function getLeads(req, res, next) {
  try {
    const [rows] = await pool.execute('SELECT * FROM partial_leads ORDER BY updated_at DESC');
    return res.json({ success: true, data: rows });
  } catch (err) {
    next(err);
  }
}

async function updateLeadStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await pool.execute('UPDATE partial_leads SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [status, id]);
    return res.json({ success: true, message: 'Lead status updated.' });
  } catch (err) {
    next(err);
  }
}

async function deleteLead(req, res, next) {
  try {
    const { id } = req.params;
    await pool.execute('DELETE FROM partial_leads WHERE id = ?', [id]);
    return res.json({ success: true, message: 'Lead deleted.' });
  } catch (err) {
    next(err);
  }
}

module.exports = { saveLead, getLeads, updateLeadStatus, deleteLead };
