require('dotenv').config();
const express = require('express');
const app = express();


const Router = require('./api/routes');

app.use('/', Router);

module.exports = app;
export {};