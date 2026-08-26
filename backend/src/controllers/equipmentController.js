const { pool } = require('../config/db');

async function getEquipment(req, res, next) {
  try {
    const [rows] = await pool.execute('SELECT * FROM equipment WHERE is_active = 1 ORDER BY id');
    return res.json({ success: true, data: rows });
  } catch (err) { next(err); }
}

async function getAllEquipment(req, res, next) {
  try {
    const [rows] = await pool.execute('SELECT * FROM equipment ORDER BY id');
    return res.json({ success: true, data: rows });
  } catch (err) { next(err); }
}

async function createEquipment(req, res, next) {
  try {
    const { name, short_desc, image_url } = req.body;
    if (!name) return res.status(422).json({ success: false, message: 'Name is required.' });
    await pool.execute(
      'INSERT INTO equipment (name, short_desc, image_url) VALUES (?, ?, ?)',
      [name, short_desc || null, image_url || null]
    );
    return res.status(201).json({ success: true, message: 'Equipment added.' });
  } catch (err) { next(err); }
}

async function updateEquipment(req, res, next) {
  try {
    const { name, short_desc, image_url, is_active } = req.body;
    await pool.execute(
      'UPDATE equipment SET name=?, short_desc=?, image_url=?, is_active=? WHERE id=?',
      [name, short_desc, image_url, is_active ?? 1, req.params.id]
    );
    return res.json({ success: true, message: 'Equipment updated.' });
  } catch (err) { next(err); }
}

async function deleteEquipment(req, res, next) {
  try {
    await pool.execute('UPDATE equipment SET is_active=0 WHERE id=?', [req.params.id]);
    return res.json({ success: true, message: 'Equipment removed.' });
  } catch (err) { next(err); }
}

module.exports = {
  getEquipment, getAllEquipment, createEquipment, updateEquipment, deleteEquipment
};
