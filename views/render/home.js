module.exports = (req, res) => {
	res.render('pages/home', {
		xsrfToken: req.csrfToken(),
		id: res.locals.userId,
	});
};
