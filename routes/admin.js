'use strict';

const {
  Router
} = require('express');
const router = Router();
const Pizzeria = require('./../models/pizzeria');
const Menu = require('./../models/menu');
const bcrypt = require('bcrypt');
const Orders = require('./../models/orders');


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

// router.get('/admin/orders', (req, res) => {
//   Orders.find()
//     .then(orders => {
//       const name = orders.name;
//       const address = orders.address;
//       const date = orders.date;

//       const data = {
//         name,
//         address,
//         date
//       };
//       res.redirect('/admin/auth', data);
//     })
//     .catch(error => {
//       console.log('There was an error in data2  process.', error);
//     });
// });

//--------------------------------------------------------------------------------

 router.get('/admin/auth', (req, res) => {
  Orders.find()
  .populate()
  .then(orders => {
    console.log('orders',orders);
    const data = {orders};
    res.render('adminauth', data);
  })
  .catch(error => {
    console.log('There was an error in data2  process.', error);
  });
  });


//--------------------------------------------------------------------------------


router.get('/admin/auth/create', (req, res) => {
  res.render('addnew');
});

router.post('/admin', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  let auxiliaryUser;

  Pizzeria.findOne({
      email
    })
    .then(user => {
      if (!user) {
        res.render('index');
      } else {
        auxiliaryUser = user;
        return bcrypt.compare(password, user.passwordHash);
      }
    })
    .then(matches => {
      if (!matches) {
        res.render('index');
      } else {
        req.session.user = {
          _id: auxiliaryUser._id,
          email: auxiliaryUser.email,
          cart: []
        };
        res.redirect('/admin/auth');
      }
    })
    .catch(error => {
      console.log('There was an error signing up the user', error);
      next(error);
    });
});

router.post('/admin/auth/create', (req, res, next) => {
const name = req.body.name;
const price = req.body.price;
const ingredients = req.body.ingredients;


Menu.create({
  name,
  price,
  ingredients
})
.then(() => {
res.redirect('/admin/auth/create');
}).catch(error => {
  console.log('There was an error in the create product process.', error);
});
});


module.exports = router;