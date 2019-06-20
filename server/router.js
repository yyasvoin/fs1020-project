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
		id: Number(req.body.id),
		quantity: Number(req.body.quantity),
      });
      res.redirect(`/search?name=${req.body.name}`);
    } catch (error) {
      next(error);
    }
  }
  });
  
  
// All the following commands are for Postman

router.get('/product', async (req, res, next) => {
  try {
    // Get all the computer porducts json
    const allComputers = await db.getAllItems();

    // Send status and all the porducts json
    res
      .status(200)
      .send(allComputers);
  } catch (error) {
    next(error);
  }
});


//list product by ID 

router.get('/product/:input', async (req, res, next) => {
  try {
    // Get Computer by ID
	const id = parseInt(req.params.input, 10);
    const computer = await db.getComputerById(id);

     // Send matched product if that exists
    if (computer) {
      res
        .status(200)
        .json(computer);
    } else {
        res
          .status(404)
          .json({
            message: 'ID match not found'
          });
      }
  } catch (error) {
    next(error);
  }
});

  
  
// Update Item by ID

router.put('/update/:id', (req,res,next) => {
  const inputId = parseInt(req.params.id,10);
  db.updateItemById(inputId, req.body)
    .then(() => {
      res.redirect(200,'../product');
    })
    .catch(next);
});

  
 // Delete Item by ID
  
router.delete('/delete/:id', (req,res,next) => {
  const inputId = parseInt(req.params.id);
  db.deleteItemById(inputId)
    .then(() => {
      res.redirect(200,'../product');
    })
    .catch(next);
});


router.post('/register', (req, res, next) => {
  res.sendStatus(200);
});

router.post('/login', (req, res, next) => {
  res.sendStatus(200);
});



module.exports = router;


