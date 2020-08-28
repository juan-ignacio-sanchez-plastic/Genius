'use strict';

const mongoose = require('./index');
const { Schema } = mongoose;

const deckSchema = new Schema({
  key: {
    type: String,
    max: 30,
    required: true,
  },
  title: {
    type: String,
    max: 20,
    required: true,
  },
  cards: {
    type: Array,
    required: true,
  },
  creationDate: {
    type: Date,
    required: true,
  },
  author: {
    type: String,
    max: 20,
    required: true,
  },
  sharedDate: {
    type: String,
    default: Date.now(),
  }
});

const Deck = mongoose.model('Deck', deckSchema);

module.exports = Deck;
