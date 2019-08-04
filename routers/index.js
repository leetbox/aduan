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

app.use('/assets', express.static(path.join(`${__dirname}/../views/`, 'assets')));

// create application/json parser
app.use(bodyParser.json());
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }));
// prevent http parameter pollution
app.use(hpp());

app.use(morgan('dev'));

// xsrf error handler
app.use(blockXSRF);

// views
app.use('/', require('../views/render/index'));

// controllers
app.use('/api/user', require('./user'));
app.use('/api/userType', require('./userType'));
app.use('/api/status', require('./status'));
app.use('/api/category', require('./category'));
app.use('/api/branch', require('./branch'));
app.use('/api/complaint', require('./complaint'));

// live updates
app.use('/live', require('./live'));

// frontend request
app.use('/request/user', require('./frontend/user'));
app.use('/request/complaint', require('./frontend/complaint'));

/* const server = http
	.createServer(app)
	.listen(PORT_NOT_SECURE || 3000, () => {
		console.log(`ADUAN START at PORT ${PORT_NOT_SECURE}`);
	}); */

const serverSecure = https
	.createServer({
	  key: fs.readFileSync(`${__dirname}/../cert/key.pem`),
	  cert: fs.readFileSync(`${__dirname}/../cert/cert.pem`)
	}, app)
	.listen(PORT_SECURE || 3000, () => {
		console.log(`ADUAN SECURE START at PORT ${PORT_SECURE}`);
	});

process.on('SIGTERM', () => {
	// TODO
});

process.on('SIGINT', () => {
	/* server.close(() => {
    console.log('HTTP CLOSED');
		process.exit(1);
  }); */

	serverSecure.close(() => {
		console.log('HTTPS CLOSED');
		process.exit(1);
	});
});
