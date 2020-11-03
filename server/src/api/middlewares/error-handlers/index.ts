const ApiError = require('../../../models/ApiError');

module.exports = (err, req, res, next) => {
    console.log(err);
    if (err instanceof ApiError) {
        res.status(err.code).json({
            message: err.msg
        });
        return;
    }
    res.status(500).send("An internal error. Please report to an administrator.");
    return;
}

export { };