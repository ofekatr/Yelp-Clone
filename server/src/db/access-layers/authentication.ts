const { query } = require("../");

const getPasswordByUsername = (username) => query(`SELECT password FROM users WHERE username = $1 LIMIT 1;`, [username]);

const isUserExistsByUsername = (username) => query("SELECT id FROM users WHERE username = $1 LIMIT 1;", [username]);

const insertUser = (username, email, hashedPassword) => query("INSERT INTO users (username, email, password, created_date) VALUES ($1, $2, $3, $4) RETURNING *;", [username, email, hashedPassword, new Date().toISOString()]);

module.exports = {
    getPasswordByUsername,
    isUserExistsByUsername,
    insertUser
}

export { };