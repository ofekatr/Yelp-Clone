const jwt = require("jsonwebtoken");

const { JWT_KEY } = process.env;

const generateToken = ({ id, email, username }) => {
    return jwt.sign({
        id,
        email,
        username
    }, JWT_KEY, { expiresIn: '1h' });
};

module.exports = generateToken;

export { };