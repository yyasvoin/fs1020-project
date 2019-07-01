'use strict';


let db = require('../server/db');

function getSearchRoutes(req, res) {
	
  if (!req.session.username) {
    res
      .status(403)
      .render('status/forbidden');
  } else {
	  if (req.query.available) req.query.available = req.query.available === 'true';
	  db.searchItems(req.query)
      .then((computers) => {
        computers.forEach((computer) => {
		computer.available ? 'true.png' : 'false.png' ;
			
			 
        });
    res.render('search', {
      pageId: 'search',
      title: 'Search',
      username: req.session.username,
	  items: computers,
	  formValues: req.query,
		
    });
	});
  }
}


module.exports = { get: getSearchRoutes };

