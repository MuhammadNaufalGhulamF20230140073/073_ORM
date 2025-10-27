cons express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./models');
app.use(express.json());