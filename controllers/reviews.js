const Review = require("../models/review")
const Campground = require("../models/campground");
const review = require("../models/review");

module.exports.createReview = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Successfully added new review!');
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(req.params.reviewId);
    req.flash('success', 'Successfully deleted review!');
    res.redirect(`/campgrounds/${id}`);
}

module.exports.updateReview = async(req, res) => {    
    const {id, reviewId} = req.params;      
    // const review = await Review.findByIdAndUpdate(reviewId, req.body.review);
    const review = await Review.findByIdAndUpdate(reviewId, {...req.body.review});
    console.log(review);
    // await review.save();
    // req.flash('success', 'Successfully updated review!');
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.renderEditReviewForm = async (req,res) => {
    const {id, reviewId} = req.params;
    console.log(id, reviewId);
    campground = await Campground.findById(id)
    const review = await Review.findById(reviewId)
        res.render('reviews/editReview', {campground, review})        
    }

