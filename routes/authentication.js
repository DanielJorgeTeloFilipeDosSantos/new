'use strict';

const { Router } = require('express');
const router = Router();
const User = require('./../models/user');
const bcrypt = require('bcrypt');

const routeGuardMiddleware = (req, res, next) => {
  if (!req.session.user) {
    res.redirect('/sign-in');
  } else {
    next();
  }
};

router.get('/private', routeGuardMiddleware, (req, res, next) => {
    res.render('index');
  });








module.exports = router;