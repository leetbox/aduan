const rateLimit = require("express-rate-limit");
 
exports.all = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // 100 requests per windowMs
});

exports.auth = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3 // 3 requests per windowMs
});
