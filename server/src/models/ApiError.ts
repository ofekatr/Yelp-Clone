module.exports = class ApiError {

    constructor(private code: number, private msg: string, private errors?) { }

    static badRequest(msg, errors?) {
        return new ApiError(400, msg, errors);
    }

    static internal(msg, errors?) {
        return new ApiError(500, msg, errors);
    }

    static invalidInput(errors?) {
        return new ApiError(601, "Invalid input.", errors);
    }

    static userExists(errors?) {
        return new ApiError(602, "Username is taken.", errors);
    }

    static userNotExists(errors?) {
        return new ApiError(603, "User does not exist.", errors);
    }

    static wrongCredentials(errors?) {
        return new ApiError(604, "Provided wrong credentials.", errors);
    }
}

export { }