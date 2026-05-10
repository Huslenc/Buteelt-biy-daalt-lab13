function errorHandler(err, req, res, next) {
  console.error(err.stack);
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || 'Internal Server Error',
    code: status
  });
}

function notFound(req, res) {
  res.status(404).json({ error: 'Route not found', code: 404 });
}

module.exports = { errorHandler, notFound };
