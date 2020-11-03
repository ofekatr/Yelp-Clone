const { query } = require('../../db');

const createReview = async (req, res) => {
    const { name, content, rating } = req.body;
    const { id: restaurant_id } = req.params;
    console.log(restaurant_id, name, content, rating);
    try {
        const review = (await query("INSERT INTO reviews(restaurant_id, name, content, rating) VALUES ($1, $2, $3, $4) RETURNING *;", [restaurant_id, name, content, rating])).rows[0];
        res.status(200).json({
            status: "success",
            review
        });
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    createReview
};

export { };