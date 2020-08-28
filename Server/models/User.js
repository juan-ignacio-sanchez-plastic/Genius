'use strict';

const mongoose = require('./index');
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    max: 40,
    required: true,
  },
  password: {
    type: String,
    max: 20,
    required: true,
  },
  username: {
    type: String,
    max: 10,
    required: true,
  },
  gender: {
    type: Boolean,
    required: true,
  },
  birthdate: {
    type: Date,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
