'use strict';

const {
  Router
} = require('express');
const router = Router();
const User = require('../models/user');

router.get('/', (req, res, next) => {
  if (!req.session.user) {
    res.render('index');
  } else {
    User.findById(req.session.user._id)
      .then(user => {
        const data = {
          user
        };
        res.render('index', data);
      });
  }








});

module.exports = router;

//https://giovani2.herokuapp.com/