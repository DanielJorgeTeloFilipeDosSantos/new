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
  ingredients:{
    type: String,
    required: true,
    lowercase: true,
    trim: true
  }
});

module.exports = mongoose.model('Menu', schema);