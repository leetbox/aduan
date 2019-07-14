const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const xsrf = require('csurf');
const blockXSRF = require('../libraries/block-xsrf');
const helmet = require('helmet');
const hpp = require('hpp');
const https = require('https');
const http = require('http');
const morgan = require('morgan');
const path = require('path');

const limiter = require('../libraries/bruteforce');

// xsrf protection
const xsrfProtection = xsrf({ cookie: true });

global.xsrfProtection = xsrfProtection;

const app = express();

// to parse cookie (.;)
app.use(cookieParser());

// request limiter
app.use("/api/", limiter.all);
app.use("/api/user/login", limiter.auth);

// helmet
app.use(helmet.hidePoweredBy({ setTo: 'Ridhuan Hassan' }));
app.use(helmet.dnsPrefetchControl());
app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
app.use(helmet.xssFilter()); // basic
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());
app.use(helmet.frameguard({ action: 'sameorigin' }));
app.use(helmet.hsts({ maxAge: 5184000 }));
app.use(helmet.noCache());
// TODO read and apply CSP

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.use('/assets', express.static(path.join(`${__dirname}/../views/`, 'assets')))

// create application/json parser
app.use(bodyParser.json());
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }));
// prevent http parameter pollution
app.use(hpp());

app.use(morgan('dev'));

const { PORT } = require('../settings/express');

// views
app.use('/', require('../views/render/index'));

// controllers
app.use('/api/user', require('./user'));
app.use('/api/userType', require('./userType'));
app.use('/api/status', require('./status'));
app.use('/api/category', require('./category'));
app.use('/api/branch', require('./branch'));
app.use('/api/complaint', require('./complaint'));

// frontend request
app.use('/request/user', require('./frontend/user'));


const server = http
	.createServer(app)
	.listen(PORT || 3000, () => {
		console.log(`ADUAN START at PORT ${PORT}`);
	});

/* https
	.createServer({
	  key: fs.readFileSync('server.key'),
	  cert: fs.readFileSync('server.cert')
	}, app)
	.listen(PORT || 3000, () => {
		console.log(`ADUAN START at PORT ${PORT}`);
	}) */

process.on('SIGTERM', () => {
	// TODO
});

process.on('SIGINT', () => {
	server.close(() => {
    console.log('HTTP CLOSED');
    process.exit(1);
  });
});
