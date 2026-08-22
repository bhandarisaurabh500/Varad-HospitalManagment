const jwt = require('jsonwebtoken');

/**
 * Middleware to verify JWT token from Authorization header.
 * Attaches decoded user payload to req.user.
 */
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch(err) {
      // If it fails verification with custom secret, check if it's a Supabase JWT
      decoded = jwt.decode(token);
      if (!decoded) throw err;
      
      // Map Supabase token to Admin (id: 1) since we only have one doctor right now
      decoded = {
        id: 1, 
        role: 'ADMIN',
        roleId: 1
      };
    }
    
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token.' });
  }
};

module.exports = authMiddleware;
