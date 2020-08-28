'use strict';

const { Router } = require('express');
const Deck = require('./controllers/Deck');
const User = require('./controllers/User');
const authMiddleware = require('./middlewares/auth');

const router = new Router();

router.get('/decks', Deck.getAll);
router.get('/deck/:key', authMiddleware, Deck.download);
router.post('/deck', authMiddleware, Deck.post);

router.post('/register', User.create);
router.post('/login', User.login);

router.get('/me', authMiddleware, User.profile);


module.exports = router;
