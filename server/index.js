'use strict';

require('dotenv').config(); // Run this first to ensure all environment variables are set

let path = require('path');
const express = require('express');
let session = require('express-session');
const router = require('../router/router');
let defaultSessionValues = require('./middleware/default-session-values');
let authentication = require('./middleware/authentication');
const defaultErrorHandler = require('./middleware/default-error-handler.js');


// Create an instance of an Express server app
const app = express();

// Use the EJS templating engine (comment this out if no webpages are generated)
app.set('view engine', 'ejs');

// Serve open static assets starting from the URL path `/static` from the `static/open` folder
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

// Middleware to prepare default values for sessions
// This must come after the session middleware to ensure its values are set properly
app.use(defaultSessionValues);


// Parse incoming JSON
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// Add our defined routes from router.js
app.use(router);

// Serve protected static assets starting from the URL
// path `/static/protected` from the folder `static/protected`
app.use('/static/protected', express.static(path.resolve('static/protected')));


// Default error handler should in any of our routes we call next() with an error
app.use(defaultErrorHandler);



// Start the express server
const port = 3000;
app.listen(port, () => {
  console.log(`Express server started on port ${port}.`);
});
