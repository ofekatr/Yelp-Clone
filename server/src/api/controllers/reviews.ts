<<<<<<< HEAD
const reviews_db = require('../../db/access-layers/reviews');
const restaurants_db = require('../../db/access-layers/restaurants');
=======
const { query } = require('../../db');
const { F_GET_RESTAURANT } = process.env;
>>>>>>> master

const createReview = async (req, res, next) => {
    const { name, content, rating } = req.body;
    const { id: restaurant_id } = req.params;
    try {
        await reviews_db.createReview(restaurant_id, name, content, rating);
        const restaurant = { ...(await restaurants_db.getRestaurant(restaurant_id)).rows[0] };
        restaurant.reviews = (await restaurants_db.getRestaurantReviews(restaurant_id)).rows;
        restaurant.reviews_count = restaurant.reviews.length;
        res.status(201).json({
            status: "success",
            restaurant
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createReview
};

export { };