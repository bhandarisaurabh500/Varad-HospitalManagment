/**
 * Centralized error handling middleware.
 * Must be registered LAST in Express app.
 */
const errorMiddleware = (err, req, res, next) => {
  // Multer file errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({
      success: false,
      message: `File too large. Maximum size is ${process.env.MAX_FILE_SIZE_MB || 5}MB.`,
    });
  }

  const statusCode = err.statusCode || err.status || 500;
  const message    = err.message   || 'Internal server error';

  // Don't leak stack traces in production
  const response = {
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  };

  res.status(statusCode).json(response);
};

module.exports = errorMiddleware;
