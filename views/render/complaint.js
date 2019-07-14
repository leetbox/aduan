module.exports = (req, res) => {
	res.render('pages/complaint', {
		url: 'localhost:8181',
	});
};
