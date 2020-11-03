const { query } = require("../");

const createReview = (restaurant_id, name, content, rating) => query("INSERT INTO reviews(restaurant_id, name, content, rating, created_date) VALUES ($1, $2, $3, $4, $5);", [restaurant_id, name, content, rating, new Date().toISOString()]);

module.exports = {
    createReview
}

export { };