const pool = require('../config/db');

// Get all active guidelines
const getGuidelines = async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM healthcare_guidelines WHERE is_active = 1 ORDER BY sort_order ASC, id ASC'
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    next(error);
  }
};

// Create a new guideline
const createGuideline = async (req, res, next) => {
  try {
    const { title, icon, points, sort_order } = req.body;
    
    const { rows } = await pool.query(
      `INSERT INTO healthcare_guidelines (title, icon, points, sort_order) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [title, icon, JSON.stringify(points || []), sort_order || 0]
    );
    
    res.status(201).json({ success: true, message: 'Guideline created', data: rows[0] });
  } catch (error) {
    next(error);
  }
};

// Update an existing guideline
const updateGuideline = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, icon, points, sort_order, is_active } = req.body;
    
    const { rows } = await pool.query(
      `UPDATE healthcare_guidelines 
       SET title = COALESCE($1, title), 
           icon = COALESCE($2, icon), 
           points = COALESCE($3, points), 
           sort_order = COALESCE($4, sort_order),
           is_active = COALESCE($5, is_active)
       WHERE id = $6 RETURNING *`,
      [title, icon, points ? JSON.stringify(points) : null, sort_order, is_active, id]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Guideline not found' });
    }
    
    res.json({ success: true, message: 'Guideline updated', data: rows[0] });
  } catch (error) {
    next(error);
  }
};

// Delete a guideline
const deleteGuideline = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const { rows } = await pool.query(
      'DELETE FROM healthcare_guidelines WHERE id = $1 RETURNING id',
      [id]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Guideline not found' });
    }
    
    res.json({ success: true, message: 'Guideline deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getGuidelines,
  createGuideline,
  updateGuideline,
  deleteGuideline
};
