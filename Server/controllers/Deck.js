'use strict';

const Deck = require('../models/Deck');

exports.getAll = async (req, res) => {
  try {
    const decks = await Deck.find();
    res.status(200);
    res.json(decks);
  } catch (e) {
    console.error(`Couldn't get all decks: `, e);
    res.sendStatus(500);
  }
};

exports.post = async (req, res) => {
  try {
    const deck = req.body;
    const { username } = req.user;
    deck.author = username;
    const newDeck = await Deck.create(deck);
    res.status(201);
    res.json(newDeck);
  } catch (e) {
    console.error(`Couldn't create a new deck: `, e);
    res.sendStatus(500);
  }
};

exports.download = async (req, res) => {
  try {
    const { key } = req.params;
    const deck = await Deck.findOne({ key: key });
    res.status(200);
    res.json(deck);
  } catch (e) {
    console.error(`Couldn't download a deck: `, e);
    res.sendStatus(500);
  }
};
