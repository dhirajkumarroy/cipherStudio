export default function errorHandler(err, req, res, next) {
  console.error(err && err.stack ? err.stack : err);
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  // Avoid leaking mongoose internals in production
  res.status(status).json({ message });
}
