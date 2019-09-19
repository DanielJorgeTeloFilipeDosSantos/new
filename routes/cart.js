'use strict';

const {
  Router
} = require('express');
const router = Router();
const User = require('./../models/user');
const Menu = require('./../models/menu');


router.get('/cart', (req, res, next) => {
  
      const data =[];

      User.findById(req.session.user._id)
        .then(user => {
                  for (let i = 0; i < user._order.length; i++) {
                    console.log('hello',user._order[i]);
                    Menu.findById(user._order[i])
                    .then(user2=>{
                      data.push(user2);
                      console.log('dataaaaa',data);
                    })
                  }
                })
                .catch(error => {
                  console.log('There was an error in data2  process.', error);
                });

                console.log('data');

                res.render('cart');
              });



          // const cart2 = req.body.cart;
          // console.log('cart2',cart2)
          // res.render('cart', { title: 'Hello World!' });



    module.exports = router;