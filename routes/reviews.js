const express = require('express');
const router = express.Router({ mergeParams: true });
const reviews = require('../controllers/reviews');

const Campground = require('../models/campground');
const Review = require('../models/review');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');

const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const { reviewSchema } = require('../schemas');



router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.get('/:reviewId/edit', isLoggedIn, isReviewAuthor, catchAsync(reviews.renderEditReviewForm));

router.route('/:reviewId')
    .put(isLoggedIn, isReviewAuthor, catchAsync(reviews.updateReview))
    .delete(isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;