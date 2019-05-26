'use strict';

require('dotenv').config();

const express = require('express');

const router = require('./router');
let session = require('express-session');

const app = express();

let path = require('path');

let defaultSessionValues = require('./middleware/default-session-values');
let authentication = require('./middleware/authentication');
let defaultErrorHandler = require('./middleware/default-error-handler');

app.set('view engine', 'ejs');

app.use('/static', express.static(path.resolve('static/open')));

app.use(session ({
  secret: process.env.SESSION_SECRET, // Used to cryptographically "sign" the session ID
  resave: false, // Forces the session to be saved back to the session store, just a sane default
  saveUninitialized: true, // All HTTP requests without a session have a session started for them
  cookie: {
    httpOnly: true, // Makes cookie inaccessible to client side JS
    maxAge: 12000000, // Cookie will expire after two hours
  },
}));

app.use(defaultSessionValues);

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(router);

app.use(authentication);

app.use('/static/protected', express.static(path.resolve('static/protected')));

app.use(defaultErrorHandler);

app.listen(process.env.HTTP_PORT, () => {
  console.log(`Express server started on port ${process.env.HTTP_PORT}.`);
});
