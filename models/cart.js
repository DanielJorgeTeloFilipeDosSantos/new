'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  idutilizador: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
    //unique: true
  },
  items: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
    //unique: true
  }
});

module.exports = mongoose.model('Cart', schema);