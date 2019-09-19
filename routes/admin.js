'use strict';

const { Router } = require('express');
const router = Router();

router.get('/admin', (req, res, next) => {
  res.render('pizzeria');
});

module.exports = router;