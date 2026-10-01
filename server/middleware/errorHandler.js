const notFound = (req, res) => {
  res.status(404).json({ success: false, error: `Route not found: ${req.method} ${req.originalUrl}` });
};

const errorHandler = (err, req, res, next) => {
  console.error(err);
  if (err.name === "CastError") {
    return res.status(400).json({ success: false, error: "Invalid ID format" });
  }
  if (err.code === 11000) {
    return res.status(400).json({ success: false, error: "Duplicate value: already exists" });
  }
  res.status(err.status || 500).json({ success: false, error: err.message || "Internal server error" });
};

module.exports = { notFound, errorHandler };
