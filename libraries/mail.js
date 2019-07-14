const gmail = require('gmail-send');

exports.gmail = async (config, to, subject, text) => {
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

