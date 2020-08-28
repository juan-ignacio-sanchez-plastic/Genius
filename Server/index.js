'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./router');
const cors = require('cors');

const HOST = process.env.HOST;
const PORT = process.env.PORT;

const corsConfig = {
  origin: 'http://localhost:19001',
  credentials: true,
}

app.use(cors(corsConfig));
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server listening on http://${HOST}:${PORT} 🐱‍🏍`);
});
