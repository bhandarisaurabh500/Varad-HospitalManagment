const { pool } = require('../config/db');

/** GET /api/services - Public */
async function getServices(req, res, next) {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM services WHERE is_active=1 ORDER BY sort_order, id'
    );
    return res.json({ success: true, data: rows });
  } catch (err) { next(err); }
}

/** GET /api/services/:id - Public */
async function getServiceById(req, res, next) {
  try {
    const [rows] = await pool.execute('SELECT * FROM services WHERE id=?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ success: false, message: 'Service not found.' });
    return res.json({ success: true, data: rows[0] });
  } catch (err) { next(err); }
}

/** POST /api/services - Admin */
async function createService(req, res, next) {
  try {
    const { name, slug, description, short_desc, image_url, icon, sort_order } = req.body;
    if (!name || !slug) return res.status(422).json({ success: false, message: 'name and slug are required.' });
    await pool.execute(
      'INSERT INTO services (name, slug, description, short_desc, image_url, icon, sort_order) VALUES (?,?,?,?,?,?,?)',
      [name, slug, description || null, short_desc || null, image_url || null, icon || null, sort_order || 0]
    );
    return res.status(201).json({ success: true, message: 'Service created.' });
  } catch (err) { next(err); }
}

/** PUT /api/services/:id - Admin */
async function updateService(req, res, next) {
  try {
    const { name, description, short_desc, image_url, icon, sort_order, is_active } = req.body;
    await pool.execute(
      'UPDATE services SET name=?, description=?, short_desc=?, image_url=?, icon=?, sort_order=?, is_active=? WHERE id=?',
      [name, description, short_desc, image_url, icon, sort_order || 0, is_active ?? 1, req.params.id]
    );
    return res.json({ success: true, message: 'Service updated.' });
  } catch (err) { next(err); }
}

/** DELETE /api/services/:id - Admin */
async function deleteService(req, res, next) {
  try {
    await pool.execute('DELETE FROM services WHERE id=?', [req.params.id]);
    return res.json({ success: true, message: 'Service deleted.' });
  } catch (err) { next(err); }
}

module.exports = { getServices, getServiceById, createService, updateService, deleteService };
