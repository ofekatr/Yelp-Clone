const { query } = require('../../db');
const { F_GET_RESTAURANT, F_GET_RESTAURANTS, F_UPDATE_RESTAURANT, P_DELETE_RESTAURANT } = process.env;

// Get All Restaurants.
const getRestaurants = async (_, res) => {
    try {
        const restaurants = (await query('SELECT restaurants.*, COUNT(reviews.id) AS reviews_count FROM restaurants LEFT JOIN reviews ON (restaurants.id = reviews.restaurant_id) GROUP BY restaurants.id;')).rows;
        // res.send("These are the restaurants.");
        res.status(200).json({
            status: "success",
            count: restaurants.length,
            data: {
                restaurants
            }
        });
    } catch (err) {
        console.error(err);
    }
};

// Get A Restaurant.
const getRestaurant = async (req, res) => {
    const { id } = req.params;
    try {
        const restaurant = { ...(await query(`SELECT * FROM ${F_GET_RESTAURANT}($1);`, [id])).rows[0] };
        restaurant.reviews = (await query(`SELECT * FROM reviews WHERE restaurant_id = $1 ORDER BY ID DESC;`, [restaurant.id])).rows;
        restaurant.reviews_count = restaurant.reviews.length;
        // res.send("These are the restaurants.");
        res.status(200).json({
            status: "success",
            data: {
                restaurant
            }
        });
    } catch (err) {
        console.error(err);
    }
};

// Create A Restaurant.
const createRestaurant = async (req, res) => {
    const { name, city, price_range } = req.body;
    try {
        const { rows } = await query(`SELECT * FROM create_restaurant($1, $2, $3);`, [name, city, price_range]);
        res.status(201).json({
            status: "success",
            restaurant: rows[0]
        });
    } catch (err) {
        console.error(err);
    }
};

// Update A Restaurant.
const updateRestaurant = async (req, res) => {
    const { name, city, price_range } = req.body;
    const { id } = req.params;
    console.log(req.body, req.params);
    try {
        const { rows } = await query(`SELECT * FROM ${F_UPDATE_RESTAURANT}($1, $2, $3, $4)`, [name, city, price_range, id]);
        res.status(200).json({
            status: "success",
            restaurant: rows[0]
        });
    } catch (err) {
        console.error(err);
    }
};

// Delete A Restaurant.
const deleteRestaurant = async (req, res) => {
    const { id } = req.params;
    try {
        await query(`CALL ${P_DELETE_RESTAURANT}($1)`, [id]);
        res.status(204).json({
            status: "success"
        });

    } catch (err) {
        console.error(err);
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