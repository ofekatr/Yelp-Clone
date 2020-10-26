const router = require("express").Router();

const restaurantsRouter = require('../restaurants');
const RESTAURANTS = 'restaurants';

// Restaurants Routing
router.use(`/${RESTAURANTS}`, restaurantsRouter);

module.exports = router;

export {};