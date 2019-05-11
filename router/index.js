'use strict';

const express = require('express');

const router = express.Router();


// Renders the home page
router.get('/', (req, res) => {
  res.render('home');
});


module.exports = router;
