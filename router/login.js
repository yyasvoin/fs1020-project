'use strict';

let userPath = require('../server/db');

const argon2 = require('argon2');

/**
 * Initial page rendering
 */
function getLoginRoute(req, res) {
  res.render('login', {
    pageId: 'login',
    title: 'Login',
    username: req.session.username,
    formError: null,
    formValues: { username: null, password: null },
  });
}


/**
 * Form submission
 */
function postLoginRoute(req, res, next) {
  userPath.usernameExists(req.body.username)

    // Validate
    .then((usernameExists) => {
      // Login is not valid if username does not exist
      if (!usernameExists) {
        return false;

      // If the username exists verify the password is correct
      } else {
        return userPath.getUserPasswordHash(req.body.username)
        .then(async (dbHash) => {
          if (await argon2.verify(dbHash, req.body.password)) {
            console.log('password hash match', dbHash);
            return true;
          } else {
            console.log('passwrod hash doesnt match');
            return false;
          }
        });
      }
    })

    // Render on failure or log user in
    .then((isValid) => {
      // If invalid respond with authentication failure
      if (!isValid) {
        res
          .status(401)
          .render('login', {
            pageId: 'login',
            title: 'Login',
            username: req.session.username,
            formError: 'Authentication failed.',
            formValues: {
              username: req.body.username || null,
              password: req.body.password || null,
            },
          });

      // Else log the user in and redirect to home page
      } else {
        req.session.username = req.body.username;
        res.redirect('/');
      }
    })
    .catch(next);
}


module.exports = {
  get: getLoginRoute,
  post: postLoginRoute,
};
