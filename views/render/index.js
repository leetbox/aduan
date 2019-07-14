const router = require('express').Router();

const auth = require('../../libraries/authenticate');

router.get('/', (req, res) => res.redirect('/utama'));

router.get('/masuk', global.xsrfProtection, require('./login'));

router.get('/utama', global.xsrfProtection, auth.checkAuth(), require('./home'));

router.get('/aduan/senarai', require('./list'));

router.get('/aduan/butiran', require('./complaint'));

module.exports = router;