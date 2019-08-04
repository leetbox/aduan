const gmail = require('gmail-send');

exports.gmail = async (config, to, subject, text, html) => {
	const { user, pass } = config;

	return new Promise((resolve, reject) => {
		gmail({
	  		user,
	  	  pass,
	  	  to,
	  	  subject,
	  	  text,
	  	  html,
	  	})({}, function (err, res) {
	  		if (err) reject(err);
	  	  resolve(res);
	  	});
	});
}
