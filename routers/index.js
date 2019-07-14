const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const xsrf = require('csurf');
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
