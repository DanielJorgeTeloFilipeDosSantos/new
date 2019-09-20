'use strict';

const {
  Router
} = require('express');
const router = Router();
const User = require('./../models/user');
const Menu = require('./../models/menu');


router.get('/cart', (req, res, next) => {
       User.findById(req.session.user._id).populate("_order")
         .then(user => {
           console.log("-----USER-------", user._order[0]);

           const reducer = (accumulator, currentValue) => accumulator + currentValue;
           console.log(user._order.map(user2=>+user2.price).reduce(reducer));
           console.log(user._order.map(user2=>+user2.price));
           let total = user._order.map(user2=>+user2.price).reduce(reducer);

           const data ={
             total,
             user,
             orderlist: user._order
           };
           res.render('cart',data);
          })
        .catch(error => {
          console.log('There was an error in data2  process.', error);
        });
     });
  

          //  dataCart = [];  
          //          for (let i = 0; i < user._order.length; i++) {
          //            console.log('hello',user._order[i]);  
                    //  Menu.findById(user._order[i])
                    //  .then(user2=>{
                    //    dataCart.push(user2);  
                    //    console.log('<<<<<<<<<<<<<<<',dataCart);

                  
                    //  });

          // const cart2 = req.body.cart;
          // console.log('cart2',cart2)
          // res.render('cart', { title: 'Hello World!' });



    module.exports = router;