'use strict';

const { Router } = require('express');
const router = Router();
const User = require('./../models/user');
const bcrypt = require('bcrypt');

router.get('/createAccount', (req, res, next) => {
    res.render('register');

});

router.get('/', (req, res, next) => {
    res.render('index');
});


//change the sign on nameeee
const routeGuardMiddleware = (req, res, next) => {
    if (!req.session.user) {
      res.redirect('/register/sign-in');
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
        res.redirect('/');
      })
      .catch(error => {
        console.log('There was an error in the sign up process.', error);
      });
  });

  router.get('/sign-in', (req, res, next) => {
    res.render('sign-in');
  });
  
  router.post('/sign-in', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    
    let auxiliaryUser;
  
    User.findOne({ email })
      .then(user => {
        if (!user) {
          throw new Error('USER_NOT_FOUND');
        } else {
          auxiliaryUser = user;
          return bcrypt.compare(password, user.passwordHash);
        }
      })
      .then(matches => {
        if (!matches) {
          throw new Error('PASSWORD_DOESNT_MATCH');
        } else {
          req.session.user = {
            _id: auxiliaryUser._id
          };
          res.redirect('private');
        }
      })
      .catch(error => {
        console.log('There was an error signing up the user', error);
        next(error);
      });
  });

module.exports = router;