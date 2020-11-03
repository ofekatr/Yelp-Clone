const router = require("express").Router();

const ReviewsController = require('../../controllers/reviews');

router.post('/:id', ReviewsController.createReview);

module.exports = router;