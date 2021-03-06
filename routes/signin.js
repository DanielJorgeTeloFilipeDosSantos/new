
'use strict';

const { Router } = require('express');
const router = Router();
const User = require('./../models/user');
const bcrypt = require('bcrypt');

router.get('/', (req, res, next) => {
    res.render('index');
  });

router.get('/signin', (req, res, next) => {
    res.render('signin');
  });
  
  router.post('/signin', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    
    let auxiliaryUser;
  
    User.findOne({ email })
      .then(user => {
        if (!user) {
          res.render('index',{myerror: 'user not found'});
        } else {
          auxiliaryUser = user;
          return bcrypt.compare(password, user.passwordHash);
        }
      })
      .then(matches => {
        if (!matches) {
          res.render('index',{myerror: 'user not found'});
        } else {
          req.session.user = {
            _id: auxiliaryUser._id,
            email: auxiliaryUser.email,
            cart: []
          };
          res.redirect('/');
        }
      })
      .catch(error => {
        console.log('There was an error signing up the user', error);
        next(error);
      });
  });

  module.exports = router;