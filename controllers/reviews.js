const Review = require('../models/Review')
const User = require('../models/User');
const Booking = require('../models/Booking');

//@desc Get all reviews
//@route GET /api/v1/reviews
//@access Public
exports.getReviews = async (req, res, next) => {
    const queryStr = JSON.stringify(req.query);

    try {
        const reviews = await Review.find(JSON.parse(queryStr)).populate({
            path: 'user', 
            select: 'name',
        }).populate({path: 'replys'});
        res.status(200).json({ success: true, count: reviews.length, data: reviews });
    } catch (err) {
        console.error(err.stack);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}

//@desc Get single review
//@route GET /api/v1/reviews/:id
//@access Public
exports.getReview = async (req, res, next) => {
    try {
        const review = await Review.findById(req.params.id).populate({
            path: 'user', 
            select: 'name',
        });

        if (!review) {
            return res.status(400).json({ success: false, message: `No review with the ID of ${req.params.id}` });
        }

        const userId = review.user._id;

        const bookings = await Booking.find({ user: userId }).populate('hotel room');

        review.user.bookings = bookings;

        res.status(200).json({ success: true, data: review, data1: bookings});
    } catch (err) {
        console.error(err); // Log any errors
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}



//@desc Create new review
//@route POST /api/v1/hotels/:hotelId/reviews
//@access Private
exports.createReview = async (req, res, next) => {
    const review = await Review.create(req.body);
    res.status(201).json({
        success: true,
        data: review
    });
}

//@desc Update review
//@route PUT /api/v1/reviews/:id
//@access Private
exports.updateReview = async (req, res, next) => {
    try{
        const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if(!review){
            return res.status(400).json({ success: false, message: `No review with the ID of ${req.param.id}` });
        }

        res.status(200).json({ success: true, data: review });
    }catch (err){
        res.status(400).json({ success: false });
    }
}

//@desc Delete review
//@route DELETE /api/v1/reviews/:id
//@access Private
exports.deleteReview = async (req, res, next) => {
    try{
        const review = await Review.findById(req.params.id);
        if(!review){
            return res.status(400).json({ success: false, message: `No review with the ID of ${req.param.id}` });
        }
        await review.deleteOne();
        res.status(200).json({ success: true, data: {} });
    }catch(err){
        res.status(400).json({ success: false });
    }
}