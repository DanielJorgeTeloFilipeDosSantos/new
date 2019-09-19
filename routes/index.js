'use strict';

const {
  Router
} = require('express');
const router = Router();
const User = require('../models/user');
const Menu = require('../models/menu');

router.get('/', (req, res, next) => {
  if (!req.session.user) {
    res.render('index');
  } else {
    Promise.all([
      Menu.find(),
      User.findById(req.session.user._id)
    ])
      .then(([menu,user]) => {
        const data = {
          menu,
          user
        };
        res.render('index', data);
      });
  }
});

module.exports = router;

//https://giovani2.herokuapp.com/