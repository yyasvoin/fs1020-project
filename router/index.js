'use strict';

const express = require('express');

const router = express.Router();


// Renders the home page
router.get('/', (req, res) => {
  res.render('home');
});

router.post('/register', (req, res, next) => {
  res.statusCode = 201;
});

router.post('/login', (req, res, next) => {
  res.statusCode = 202;
});

router.get('/product', (req, res, next) => {
  res.statusCode = 200;
});

router.get('/item/:id', (req, res, next) => {
  res.statusCode = 200;
});

router.post('/item', (req, res, next) => {
  res.statusCode = 200;
});

router.delete('/item/:id', (req, res, next) => {
  res.statusCode = 200;
});

router.patch('/item/:id', (req, res, next) => {
  res.statusCode = 200;
});


module.exports = router;


