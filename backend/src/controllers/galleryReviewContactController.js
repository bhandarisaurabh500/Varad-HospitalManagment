const { pool } = require('../config/db');
const { uploadToSupabase } = require('../services/storageService');
/* ─── GALLERY ─── */
async function getGallery(req, res, next) {
  try {
    const { category } = req.query;
    let query = 'SELECT * FROM gallery WHERE is_active=1';
    const params = [];
    if (category) { query += ' AND category=?'; params.push(category); }
    query += ' ORDER BY sort_order, id';
    const [rows] = await pool.execute(query, params);
    return res.json({ success: true, data: rows });
  } catch (err) { next(err); }
}

async function createGalleryItem(req, res, next) {
  try {
    const { title, description, category, sort_order } = req.body;
    let image_url = req.body.image_url;

    if (req.file) {
      image_url = await uploadToSupabase(req.file.buffer, req.file.originalname, req.file.mimetype, 'gallery');
    }

    if (!image_url) return res.status(422).json({ success: false, message: 'Image is required.' });
    await pool.execute(
      'INSERT INTO gallery (title, description, image_url, category, sort_order) VALUES (?,?,?,?,?)',
      [title || null, description || null, image_url, category || 'general', sort_order || 0]
    );
    return res.status(201).json({ success: true, message: 'Gallery item added.' });
  } catch (err) { next(err); }
}

async function updateGalleryItem(req, res, next) {
  try {
    const { title, description, category, sort_order, is_active } = req.body;
    await pool.execute(
      'UPDATE gallery SET title=?, description=?, category=?, sort_order=?, is_active=? WHERE id=?',
      [title, description, category, sort_order || 0, is_active ?? 1, req.params.id]
    );
    return res.json({ success: true, message: 'Gallery item updated.' });
  } catch (err) { next(err); }
}

async function deleteGalleryItem(req, res, next) {
  try {
    await pool.execute('UPDATE gallery SET is_active=0 WHERE id=?', [req.params.id]);
    return res.json({ success: true, message: 'Gallery item removed.' });
  } catch (err) { next(err); }
}

/* ─── REVIEWS ─── */
async function getReviews(req, res, next) {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM reviews WHERE is_approved=1 ORDER BY created_at DESC'
    );
    return res.json({ success: true, data: rows });
  } catch (err) { next(err); }
}

async function getAllReviews(req, res, next) {
  try {
    const [rows] = await pool.execute('SELECT * FROM reviews ORDER BY created_at DESC');
    return res.json({ success: true, data: rows });
  } catch (err) { next(err); }
}

async function createReview(req, res, next) {
  try {
    const { reviewer_name, rating, review } = req.body;
    if (!rating || !review) return res.status(422).json({ success: false, message: 'rating and review are required.' });

    let patientId = null;
    if (req.user) {
      const [pt] = await pool.execute('SELECT id FROM patients WHERE user_id=?', [req.user.id]);
      if (pt.length) patientId = pt[0].id;
    }

    await pool.execute(
      'INSERT INTO reviews (patient_id, reviewer_name, rating, review, is_approved) VALUES (?,?,?,?,0)',
      [patientId, reviewer_name || 'Anonymous', rating, review]
    );
    return res.status(201).json({ success: true, message: 'Review submitted. Pending approval.' });
  } catch (err) { next(err); }
}

async function approveReview(req, res, next) {
  try {
    const { is_approved } = req.body;
    await pool.execute('UPDATE reviews SET is_approved=? WHERE id=?', [is_approved ? 1 : 0, req.params.id]);
    return res.json({ success: true, message: 'Review updated.' });
  } catch (err) { next(err); }
}

async function deleteReview(req, res, next) {
  try {
    await pool.execute('DELETE FROM reviews WHERE id=?', [req.params.id]);
    return res.json({ success: true, message: 'Review deleted.' });
  } catch (err) { next(err); }
}

/* ─── CONTACT ─── */
async function submitContact(req, res, next) {
  try {
    const { full_name, email, phone, subject, message } = req.body;
    if (!full_name || !message) return res.status(422).json({ success: false, message: 'full_name and message are required.' });
    await pool.execute(
      'INSERT INTO contact_messages (full_name, email, phone, subject, message) VALUES (?,?,?,?,?)',
      [full_name, email || null, phone || null, subject || null, message]
    );
    return res.status(201).json({ success: true, message: 'Message received. We will contact you shortly.' });
  } catch (err) { next(err); }
}

module.exports = {
  getGallery, createGalleryItem, updateGalleryItem, deleteGalleryItem,
  getReviews, getAllReviews, createReview, approveReview, deleteReview,
  submitContact,
};
