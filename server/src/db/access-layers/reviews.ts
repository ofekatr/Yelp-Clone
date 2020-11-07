const { query } = require("../");

const createReview = (restaurant_id, name, content, rating) => query("SELECT * FROM insert_review($1, $2, $3, $4, $5)", [restaurant_id, name, content, rating, new Date().toISOString()]);

module.exports = {
    createReview
}

export { };