const { query } = require("../");

const getUserByUsername = (username) => query("SELECT * FROM get_user_from_username($1)", [username]);

const isUserExistsByUsername = (username) => query("SELECT * FROM is_user_exists_by_username($1); ", [username]);

const insertUser = (username, email, hashedPassword) => query("SELECT FROM insert_user($1, $2, $3, $4);", [username, email, hashedPassword, new Date().toISOString()]);

module.exports = {
    getUserByUsername,
    isUserExistsByUsername,
    insertUser
}

export { };