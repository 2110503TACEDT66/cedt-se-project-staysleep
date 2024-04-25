const express = require('express');
const {getReviews,getReview,createReview,updateReview,deleteReview,getReviewByBookingID} = require('../controllers/reviews');

// Include other resource routers
//const replyRouter = require('./replys');

const router = express.Router({mergeParams: true});

const {protect, authorize} = require('../middleware/auth');
//router.use('/:hotelId/replys', replyRouter)

router.route('/').get(getReviewByBookingID, getReviews).post(protect, authorize('admin','user'), createReview);
router.route('/:id').get(getReview).put(protect, authorize('admin','user'), updateReview).delete(protect, authorize('admin','user'), deleteReview);

module.exports = router;