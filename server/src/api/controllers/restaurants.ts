const { query } = require('../../db');
const { F_GET_RESTAURANT, F_GET_RESTAURANTS, F_UPDATE_RESTAURANT, P_DELETE_RESTAURANT } = process.env;

// Get All Restaurants.
const getRestaurants = async (_, res) => {
    try {
        const { rows } = await query(`SELECT * FROM ${F_GET_RESTAURANTS}();`);
        // res.send("These are the restaurants.");
        res.status(200).json({
            status: "success",
            count: rows.length,
            data: {
                restaurants: rows
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
        const { rows } = await query(`SELECT * FROM ${F_GET_RESTAURANT}($1);`, [id]);
        // res.send("These are the restaurants.");
        res.status(200).json({
            status: "success",
            count: rows.length,
            data: {
                restaurant: rows[0]
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