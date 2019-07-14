exports.setCookie = (res, data) => {
    // setting cookies
    for (let key in data) {
	    if (data.hasOwnProperty(key)) {
	       res.cookie(key, data[key], {
          maxAge: 900000, // 15 minutes
          httpOnly: true,
          // secure: true,
        });
	    }
    }

    // TODO: differentiate maxAge for accessToken and refreshToken?
};

exports.getCookie = (req) => {
  const refreshToken = req.cookies.refreshToken;
  const accessToken = req.cookies.accessToken;

  return ({
  	refreshToken,
  	accessToken,
  });
};