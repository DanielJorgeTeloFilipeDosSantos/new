'use strict';

const { Router } = require('express');
const router = Router();
const Pizzeria = require('./../models/pizzeria');
const bcrypt = require('bcrypt');

const routeGuardMiddleware = (req, res, next) => {
  if (!req.session.user) {
    res.redirect('/register/sign-in');
  } else {
    next();
  }
};

router.get('/admin', (req, res, next) => {
  res.render('pizzeria');
});

router.post('/admin', (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const address = req.body.address;
  const password = req.body.password;

  bcrypt.hash(password, 10)
    .then(hash => {
      return Pizzeria.create({
        email,
        passwordHash: hash
      });
    })
    .then(user => {
      req.session.user = {
        _id: user._id
      };
      res.redirect('/admin');
    })
    .catch(error => {
      console.log('There was an error in the sign up process.', error);
    });
});


module.exports = router;