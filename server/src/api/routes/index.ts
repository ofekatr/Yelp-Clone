const express = require("express");
const router = express.Router();
const morgan = require('morgan');

const ApiRouter = require('./api-routes');

const { VERSION } = process.env;
const apiPath = `/api/v${VERSION}`;
const { TestMW } = require('../middlewares');

router.use([morgan('tiny'), express.json()]);
router.use(TestMW);

router.use(`${apiPath}`, ApiRouter);

module.exports = router;

export {};