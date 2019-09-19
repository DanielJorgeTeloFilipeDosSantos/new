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
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
    //unique: true
  },
  phone:{
    type: String,
    required: true,
    trim: true
  },
  address:{
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  passwordHash: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', schema);