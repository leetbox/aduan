module.exports = (err, req, res, next) => {
  if (err.code !== 'EBADCSRFTOKEN') return next(err);

  // handle CSRF token errors here
  res.status(403)
  res.send('Please be kind. This is a production server. Not a playground.');
};
