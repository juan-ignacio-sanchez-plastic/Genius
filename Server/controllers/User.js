'use strict';

const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || 'define you secret key on .env file';

exports.create = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailInDatabase = await User.findOne({ email: email });

    if (emailInDatabase) {
      res.status(409);
      res.json('Email is already used');
    } else {
      const hash = await bcrypt.hash(password, 10);
      req.body.password = hash;
      await User.create(req.body);
      const accessToken = jwt.sign({ email }, SECRET_KEY);
      res.status(201);
      res.json(accessToken);
    }
  } catch (e) {
    console.error(`Couldn't create a new user: `, e);
    res.sendStatus(500);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    const validatePass = await bcrypt.compare(password, user.password);
    if (!validatePass) throw new Error()

    const accessToken = jwt.sign({ email: user.email }, SECRET_KEY);
    res.status(200);
    res.json(accessToken);
  } catch (e) {
    res.status(401);
    res.send('Email or password incorrect');
  }
}

exports.profile = async (req, res) => {
  try {
    const { user } = req;
    res.status(200);
    res.json(user)
  } catch (e) {
    console.error(`Couldn't get the user data: `, e);
    res.sendStatus(500);
  }
}
