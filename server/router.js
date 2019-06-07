'use strict';

const express = require('express');
const router = express.Router();
let db = require('./db');


// Renders the home page
router.get('/', (req, res) => {
  res.render('home', {
    pageId: 'home',
    title: 'Home',
  });
});

// Catalog page
router.get('/catalog', async (req, res, next) => {
  if (req.query.available) req.query.available = req.query.available === 'true';
  try {
    const items = await db.searchItems(req.query);
    res.render('catalog', {
      items,
      pageId: 'catalog',
      title: 'catalog',
      formValues: req.query,
    });
  } catch (error) {
    next(error);
  }
});

// Search page
router.get('/search', async (req, res, next) => {
  if (req.query.available) req.query.available = req.query.available === 'true';
  try {
    const items = await db.searchItems(req.query);
    res.render('search', {
      items,
      pageId: 'search',
      title: 'search',
      formValues: req.query,
    });
  } catch (error) {
    next(error);
  }
});



router.post('/register', (req, res, next) => {
  res.sendStatus(200);
});

router.post('/login', (req, res, next) => {
  res.sendStatus(200);
});

router.get('/product', (req, res, next) => {
  res.sendStatus(200);
});

router.get('/item/:id', (req, res, next) => {
  res.sendStatus(200);
});

router.post('/item', (req, res, next) => {
  res.sendStatus(200);
});

router.delete('/item/:id', (req, res, next) => {
  res.sendStatus(200);
});

router.patch('/item/:id', (req, res, next) => {
  res.sendStatus(200);
});


module.exports = router;


