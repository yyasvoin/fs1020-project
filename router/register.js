'use strict';
let argon2 = require('argon2');

let userPath = require('../server/db');


/**
 * Initial page rendering
 */
function getRegisterRoute(req, res) {
  res.render('register', {
    pageId: 'register',
    title: 'Register',
    username: req.session.username,
    formValues: { username: null, password: null },
    formErrors: { username: null, password: null },
  });
}


/**
 * Form submission
 */
function postRegisterRoute(req, res, next) {
  // First we check if the username provided already exists
  userPath.usernameExists(req.body.username)
    .then(async (usernameExists) => {
      // Check if form values are valid
      let formErrors = {
        username: (!usernameExists && req.body.username) ? null : 'Invalid username',
        password: (req.body.password && req.body.password.length >= 6) ? null : 'Invalid password',
      };

      // If there are any errors do not register the user
      if (formErrors.username || formErrors.password) {
        res
          .status(400)
          .render('register', {
            pageId: 'register',
            title: 'Register',
            username: req.session.username,
            formErrors: formErrors,
            formValues: {
              username: req.body.username,
              password: req.body.password,
            },
          });
      // Else, the form values are valid
      } else {
        // Hash the password and call `userPath.addUser(newUser)`
        // If successful should redirect to `/login`

        const hash = await argon2.hash(req.body.password);
        const newUser = {
          username: req.body.username,
          password: hash,
        };
        userPath.createUser(newUser)
          .then(() => {
            res
              .status(200)
              .redirect('/login');
          });

      }
    })
    .catch(next);
}


module.exports = {
  get: getRegisterRoute,
  post: postRegisterRoute,
};
