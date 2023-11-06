const handleErrors = (err, _req, res, next) => {
  if (err) {
    const status = err.status || 500;

    res.status(status).json({ message: err.message });
  } else {
    next();
  }
};

module.exports = handleErrors;
