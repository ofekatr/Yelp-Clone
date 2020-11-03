const { query } = require("../");
const { F_UPDATE_RESTAURANT, P_DELETE_RESTAURANT } = process.env;

const getRestaurants = () => query('SELECT restaurants.*, COUNT(reviews.id) AS reviews_count, COALESCE(AVG(reviews.rating), 0) AS average_rating FROM restaurants LEFT JOIN reviews ON (restaurants.id = reviews.restaurant_id) GROUP BY restaurants.id;');

const getRestaurant = (id) => query('SELECT restaurants.*, COUNT(reviews.id) AS reviews_count, COALESCE(AVG(reviews.rating), 0) AS average_rating FROM restaurants LEFT JOIN reviews ON (restaurants.id = reviews.restaurant_id) WHERE (restaurants.id = $1) GROUP BY restaurants.id;', [id]);

const getRestaurantReviews = (id) => query(`SELECT * FROM reviews WHERE restaurant_id = $1 ORDER BY ID DESC;`, [id]);

const createRestaurant = (name, city, price_range) => query(`SELECT * FROM create_restaurant($1, $2, $3);`, [name, city, price_range]);

const updateRestaurant = (name, city, price_range, id) => query(`SELECT * FROM ${F_UPDATE_RESTAURANT}($1, $2, $3, $4)`, [name, city, price_range, id]);

const deleteRestaurant = (id) => query(`CALL ${P_DELETE_RESTAURANT}($1)`, [id]);

module.exports = {
    getRestaurants,
    getRestaurant,
    getRestaurantReviews,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant
}

export { };