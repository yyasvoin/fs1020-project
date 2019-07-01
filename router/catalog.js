'use strict';

let db = require('../server/db');

function getCatalogRoutes(req, res) {
  if (!req.session.username) {
    res
      .status(403)
      .render('status/forbidden');
  } else {
    db.getAllItems()
      .then((computers) => {
        computers.forEach((computer) => {
			computer.available ? 'true.png' : 'false.png' ;
        });

        res.render('catalog', {
          pageId: 'catalog',
          title: 'Catalog',
          username: req.session.username,
		  items: computers,
        });
      });
  }
}


module.exports = { get: getCatalogRoutes };
