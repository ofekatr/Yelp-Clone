const db = require("../../db/access-layers/restaurants");

// Get All Restaurants.
const getRestaurants = async (_, res, next) => {
    try {
        const restaurants = (await db.getRestaurants()).rows;
        res.status(200).json({
            status: "success",
            count: restaurants.length,
            data: {
                restaurants
            }
        });
    } catch (err) {
        next(err);
    }
};

// Get A Restaurant.
const getRestaurant = async (req, res, next) => {
    const { id } = req.params;
    try {
        const restaurant = { ...(await db.getRestaurant(id)).rows[0] };
        restaurant.reviews = (await db.getRestaurantReviews(restaurant.id)).rows;
        res.status(200).json({
            status: "success",
            data: {
                restaurant
            }
        });
    } catch (err) {
        next(err);
    }
};

// Create A Restaurant.
const createRestaurant = async (req, res, next) => {
    const { name, city, price_range } = req.body;
    try {
        const { rows } = await db.createRestaurant(name, city, price_range);
        res.status(201).json({
            status: "success",
            restaurant: rows[0]
        });
    } catch (err) {
        next(err);
    }
};

// Update A Restaurant.
const updateRestaurant = async (req, res, next) => {
    const { name, city, price_range } = req.body;
    const { id } = req.params;
    try {
        const { rows } = await db.updateRestaurant(name, city, price_range, id);
        res.status(200).json({
            status: "success",
            restaurant: rows[0]
        });
    } catch (err) {
        next(err);
    }
};

// Delete A Restaurant.
const deleteRestaurant = async (req, res, next) => {
    const { id } = req.params;
    try {
        await db.deleteRestaurant(id);
        res.status(204).json({
            status: "success"
        });

    } catch (err) {
        next(err);
    }
};

module.exports = {
    getRestaurants,
    getRestaurant,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant
};

export { };