const express = require('express');
const {getBookings, getBooking, addBooking, updateBooking,deleteBooking} = require('../controllers/bookings');
const {getReviewByBookingID} = require('../controllers/reviews');

const router = express.Router({mergeParams: true});

//const reviewRouter = require('./reviews');

const {protect, authorize} = require('../middleware/auth');

// Cut re-routing part from reviews.js and paste it here cause there is a bug in the code
router.route('/:bookingId/reviews').get(getReviewByBookingID);

router.route('/').get(protect, getBookings).post(protect, authorize('admin','user'), addBooking);
router.route('/:id').get(protect, getBooking).put(protect, authorize('admin','user'), updateBooking).delete(protect,  authorize('admin','user'), deleteBooking);

module.exports = router;