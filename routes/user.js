'use strict';

const {
  Router
} = require('express');
const router = Router();
const User = require('./../models/user');

router.get('/', (req, res, next) => {
  res.render('index');
});





router.get('/newRoute/:id', (req, res, next) => {
  const neworder = req.params.id;
  const userID = req.session.user._id;

  console.log('neworder',neworder,'userID',userID)

  User.findByIdAndUpdate(userID, {
    $push: {
      _order: neworder
    }
  })
  .then(() => {
    res.redirect('/');
  })
  .catch(error => {
    console.log('There was an error in the find by id and update process.', error);
  });
});





router.post('/sign-out', (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
});




module.exports = router;