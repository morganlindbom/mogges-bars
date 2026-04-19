// filename: src/middleware/error.middleware.js

/**
 * Global error handling middleware.
 *
 * Catches errors and returns standardized responses.
 */
export default function errorMiddleware(err, req, res, next) {
  console.error(err);

  res.status(500).json({
    message: err.message || "Internal Server Error"
  });
}