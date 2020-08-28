'use strict';

const mongoose = require('mongoose');
const HOST = process.env.HOST;
const DB_NAME = process.env.DB_NAME;

mongoose.connect(`mongodb://${HOST}:27017/${DB_NAME}`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) throw new Error(`Couldn't connect to the database "${DB_NAME}"`, err);
    console.log(`Connected to the database "${DB_NAME}"`);
  }
);

module.exports = mongoose;
