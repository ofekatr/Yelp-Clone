const router = require("express").Router();

const restaurantsRouter = require('./restaurants');
const reviewsRouter = require('./reviews');
const RESTAURANTS = 'restaurants';
const REVIEWS = 'reviews';


// Restaurants Routing
router.use(`/${RESTAURANTS}`, restaurantsRouter);
router.use(`/${REVIEWS}`, reviewsRouter)

module.exports = router;

export {};