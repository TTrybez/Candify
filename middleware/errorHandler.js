const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.stack);

  if (err.type === 'validation') {
    return res.status(400).json({
      error: 'Validation Error',
      details: err.message
    });
  }

  if (err.type === 'database') {
    return res.status(500).json({
      error: 'Database Error',
      details: 'Something went wrong with the database'
    });
  }

  res.status(500).json({
    error: 'Internal Server Error',
    details: 'Something went wrong!'
  });
};

module.exports = errorHandler;