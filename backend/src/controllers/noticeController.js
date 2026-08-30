const { pool } = require('../config/db');

async function getNotices(req, res, next) {
  try {
    const [rows] = await pool.execute('SELECT * FROM notices WHERE is_active = 1 ORDER BY id');
    return res.json({ success: true, data: rows });
  } catch (err) { next(err); }
}

async function getAllNotices(req, res, next) {
  try {
    const [rows] = await pool.execute('SELECT * FROM notices ORDER BY id');
    return res.json({ success: true, data: rows });
  } catch (err) { next(err); }
}

async function createNotice(req, res, next) {
  try {
    const { notice_text } = req.body;
    if (!notice_text) return res.status(422).json({ success: false, message: 'Notice text is required.' });
    await pool.execute(
      'INSERT INTO notices (notice_text) VALUES (?)',
      [notice_text]
    );
    return res.status(201).json({ success: true, message: 'Notice added.' });
  } catch (err) { next(err); }
}

async function updateNotice(req, res, next) {
  try {
    const { notice_text, is_active } = req.body;
    await pool.execute(
      'UPDATE notices SET notice_text=?, is_active=? WHERE id=?',
      [notice_text, is_active ?? 1, req.params.id]
    );
    return res.json({ success: true, message: 'Notice updated.' });
  } catch (err) { next(err); }
}

async function deleteNotice(req, res, next) {
  try {
    await pool.execute('DELETE FROM notices WHERE id=?', [req.params.id]);
    return res.json({ success: true, message: 'Notice removed.' });
  } catch (err) { next(err); }
}

module.exports = {
  getNotices, getAllNotices, createNotice, updateNotice, deleteNotice
};
