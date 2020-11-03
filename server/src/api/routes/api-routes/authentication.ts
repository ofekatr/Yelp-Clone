const router = require("express").Router();

const AuthenticationController = require('../../controllers/authentication');

router.post('/login', AuthenticationController.login);

router.post('/register', AuthenticationController.register);

module.exports = router;

export { }