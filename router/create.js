'use strict';

function getCreateRoutes(req, res) {
  if (!req.session.username) {
    res
      .status(403)
      .render('status/forbidden');
  } else {
    res.render('create', {
      pageId: 'create',
      title: 'Create',
      username: req.session.username,
	  formValues: {},
		formErrors: {},
    });
  }
}


module.exports = { get: getCreateRoutes };

