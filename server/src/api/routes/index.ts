const express = require("express");
const router = express.Router();
const morgan = require('morgan');

const ApiRouter = require('./api-routes');
const apiErrorHandler = require('../middlewares/error-handlers');

const { VERSION } = process.env;
const apiPath = `/api/v${VERSION}`;
const { TestMW } = require('../middlewares');

router.use([morgan('tiny'), express.json(), TestMW]);

router.use(`${apiPath}`, ApiRouter);

router.use(apiErrorHandler);

module.exports = router;

export { };