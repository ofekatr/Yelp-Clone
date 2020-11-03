const { query } = require('../../db');
const { F_GET_RESTAURANT } = process.env;
const createReview = async (req, res) => {
    const { name, content, rating } = req.body;
    const { id: restaurant_id } = req.params;
    console.log(restaurant_id, name, content, rating);
    try {
        await query("INSERT INTO reviews(restaurant_id, name, content, rating, created_date) VALUES ($1, $2, $3, $4, $5);", [restaurant_id, name, content, rating, new Date().toISOString()]);
        const restaurant = { ...(await query(`SELECT * FROM ${F_GET_RESTAURANT}($1);`, [restaurant_id])).rows[0] };
        restaurant.reviews = (await query(`SELECT * FROM reviews WHERE restaurant_id = $1 ORDER BY ID DESC;`, [restaurant.id])).rows;
        restaurant.reviews_count = restaurant.reviews.length;
        res.status(201).json({
            status: "success",
            restaurant
        });
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    createReview
};

export { };