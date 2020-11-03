const router = require("express").Router();

const restaurantsRouter = require('./restaurants');
const reviewsRouter = require('./reviews');
const authenticationRouter = require('./authentication');

const RESTAURANTS = 'restaurants';
const REVIEWS = 'reviews';
const AUTHENTICATION = 'authentication';


// Restaurants Routing
router.use(`/${RESTAURANTS}`, restaurantsRouter);
router.use(`/${REVIEWS}`, reviewsRouter);
router.use(`/${AUTHENTICATION}`, authenticationRouter);

module.exports = router;

export { };