'use strict';

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
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

router.get('/create', (req, res) => {
    res.render('create', {
        pageId: 'create',
        title: 'Add a Computer',
		name: null,
		brand: null,
        id: null,
        description: null,
		price: null,
		quantity: null,
		 formValues: {},
		formErrors: {},

    });
});

router.post('/create', async (req, res, next) => {
	 const formErrors = {};
  if (!req.body.name) {
    formErrors.name = 'Required';
  }
  if (!req.body.brand) {
    formErrors.brand = 'Required';
  }
  if (!req.body.id) {
    formErrors.id = 'Required';
  }
   if (!req.body.description) {
    formErrors.description = 'Required';
  }
   if (!req.body.price) {
    formErrors.price = 'Required';
  }
  if (!req.body.quantity) {
    formErrors.quantity = 'Required';
  }
 if (!formErrors.name) {
    try {
      const exists = await db.itemExists(req.body.id);
      if (exists) formErrors.global = 'Warning: Duplicate ID found.';
    } catch (error) {
      next(error);
      return; // Ensures rest of function doesn't run
    }
  }

    if (Object.keys(formErrors).length) {
      res
        .status(400)
        .render('create', {
          pageId: 'create',
          title: 'Add a Computer',
         
		formValues: req.body,
		formErrors,
        });
    } else {
		 try {
      await db.createItem({
        ...req.body,
        available: !!req.body.available,
		
      });
      res.redirect(`/search?name=${req.body.name}`);
    } catch (error) {
      next(error);
    }
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


