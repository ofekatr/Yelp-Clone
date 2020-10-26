const router = require("express").Router();

const RestaurantsController = require('../controllers/restaurants');
const { VERSION } = process.env;

const commonPath = `/api/v${VERSION}/restaurants`;

// Handle request to /v/restaurants
// Get Restaurans 
router.get('/', RestaurantsController.getRestaurants);

// Get A Restaurant
router.get('/:id', RestaurantsController.getRestaurant);

// Create A Restaurant
router.post('/', RestaurantsController.createRestaurant);

// Update A Restaurant
router.put('/:id', RestaurantsController.updateRestaurant);

// Delete A Restaurant
router.delete('/:id', RestaurantsController.deleteRestaurant);

module.exports= router;
