'use strict';

const {
  Router
} = require('express');
const router = Router();
const User = require('./../models/user');
const Orders = require('./../models/orders');


router.get('/cart', (req, res) => {
  User.findById(req.session.user._id).populate("_order")
    .then(user => {
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      const total = user._order.map(user2 => +user2.price).reduce(reducer);

      const data = {
        total,
        user,
        orderlist: user._order
      };
      res.render('cart', data);
    })
    .catch(error => {
      console.log('There was an error in data2  process.', error);
    });
});

router.post('/cart/final', (req, res) => {
  User.findById(req.session.user._id)
  .then(user=>{
    const name = user.name;
    const address = user.address;
    const _order = user._order;

    Orders.create({
      name,
      address,
      _order
    });
  })
  .then(()=>{
    const data = [];
    console.log(req.session.user._id)
    console.log('updateeeeeeeeeee');
    User.findByIdAndUpdate(req.session.user._id, {
      $set: {_order:data}
    });
  })
  .then(()=>{
    res.render('orderSuccess');
  })
  .catch(error => {
    console.log('There was an error in data2  process.', error);
  });
});



module.exports = router;