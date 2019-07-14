module.exports = (req, res) => {
	if (req.cookies.cookieName) {
		res.redirect('/utama');
		return;
	};

	res.render('pages/login', {
		xsrfToken: req.csrfToken(),
		flash: req.query.flash === 'true' ? true : false,
	});
};
