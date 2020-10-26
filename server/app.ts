require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');

const { VERSION } = process.env;
const restaurantsRouter = require('./api/routes/restaurants');

const apiPath = `/api/v${VERSION}`;

app.use(morgan('tiny'));
app.use(express.json());

app.use(`${apiPath}/restaurants`, restaurantsRouter);

module.exports = app;
export {};