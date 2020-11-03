const bcrypt = require("bcryptjs");

const ApiError = require("../../models/ApiError");
const db = require('../../db/access-layers/authentication');
const { validateLoginInput, validateRegisterInput } = require('../../utils/authentication/validators');
const generateToken = require("../../utils/authentication/token-utils");

const login = async (req, res, next) => {
    const { username, password } = req.body;
    const { valid, errors } = validateLoginInput(username, password);
    if (!valid) {
        next(ApiError.invalidInput(errors));
    }
    try {
        const { rows } = (await db.getPasswordByUsername(username));
        if (!rows || rows.length <= 0) {
            next(ApiError.userNotExists(errors));
        }
        const user = rows[0];
        if (!(await bcrypt.compare(password, user.password))) {
            return next(ApiError.wrongCredentials(errors));
        }
        const token = generateToken(user);
        res.status(200).json({
            status: 200,
            token
        })
    } catch (err) {
        return next(err);
    }
}

const register = async (req, res, next) => {
    const { username, email, password, confirmPassword } = req.body;
    const { errors, valid } = validateRegisterInput(username, email, password, confirmPassword);
    if (!valid) {
        return next(ApiError.invalidInput(errors));
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        console.log(hashedPassword);
        if ((await db.isUserExistsByUsername(username)).rows.length > 0) {
            return next(ApiError.userExists(errors));
        }
        console.log(username, email, password);
        const user = (await db.insertUser(username, email, hashedPassword)).rows[0];
        res.status(201).json({
            status: "success",
            token: generateToken(user)
        });
    } catch (err) {
        return next(err);
    }
}

module.exports = {
    login,
    register
}

export { };