'use strict';

const { Router } = require('express');
const router = Router();


router.get('/', (req, res, next) => {
  const cart2 = req.body.cart;
  console.log('cart2',cart2)
  res.render('cart', { title: 'Hello World!' });
});



module.exports = router;

