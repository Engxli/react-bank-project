const notFoundHandler = (req, res, next) => {
  const message = `Resource not found for ${req.originalUrl}`;
  res.status(404).json({
    success: false,
    error: message,
  });
};

module.exports = notFoundHandler;
