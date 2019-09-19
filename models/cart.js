'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
    //unique: true
  },
  price: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
    //unique: true
  },
  date:{
    type: Date, 
    default: Date.now
  }
});

module.exports = mongoose.model('Cart', schema);