'use strict';

const { Router } = require('express');
const router = Router();
const User = require('./../models/user');
const bcrypt = require('bcrypt');

router.get('/createAccount', (req, res, next) => {
    res.render('register');

});


//change the sign on nameeee
const routeGuardMiddleware = (req, res, next) => {
    if (!req.session.user) {
      res.redirect('/authentication/sign-in');
    } else {
      next();
    }
  };
  

router.post('/createAccount', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
  
    bcrypt.hash(password, 10)
      .then(hash => {
        return User.create({
          email,
          passwordHash: hash
        });
      })
      .then(user => {
        req.session.user = {
          _id: user._id
        };
        res.redirect('/authentication/private');
      })
      .catch(error => {
        console.log('There was an error in the sign up process.', error);
      });
  });

module.exports = router;