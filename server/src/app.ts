require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();


const Router = require('./api/routes');

app.use(cors())
app.use('/', Router);

module.exports = app;
export {};