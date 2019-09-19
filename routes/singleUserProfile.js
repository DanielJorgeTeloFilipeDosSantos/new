
'use strict';

const { Router } = require('express');
const router = Router();
const User = require('./../models/user');
const bcrypt = require('bcrypt');

router.get('/', (req, res, next) => {
    //const id = req.session.user._id;
    User.findById(req.session.user._id)
    .then(user => {
        const data ={
            user
        }
        res.render('singleUserProfile', data);
        
    })



  });

router.post('/edit-user', (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const address = req.body.address;
    const phone = req.body.phone;


    User.findByIdAndUpdate(req.session.user._id, {
        name,
        email,
        address,
        phone
    })
    .then(res.redirect('/singleUserProfile'))
    .catch(error => {
        console.log('There was an error in the update process.', error);
      });
  });



  module.exports = router;