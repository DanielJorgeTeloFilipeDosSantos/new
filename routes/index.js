'use strict';

const { Router } = require('express');
const router = Router();

router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;

//https://giovani2.herokuapp.com/
