'use strict';

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
    //unique: true
  },
  address:{
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  _order: [{
    type:ObjectId,
    ref: "Menu"
  }],
  date: {
    type: Date,
    default: Date.now
}
});

module.exports = mongoose.model('Orders', schema);