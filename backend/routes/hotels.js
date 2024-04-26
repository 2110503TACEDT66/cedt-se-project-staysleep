const express = require('express');
const {getHotels,getHotel,createHotel,updateHotel,deleteHotel,addHotelTags, removeHotelTags} = require('../controllers/hotels');
const {getTags,createTags,deleteTags} = require('../controllers/tags');

// Include other resource routers
const bookingRouter = require('./bookings');
const roomRouter = require('./rooms');
const reviewRouter = require('./reviews');
const replyRouter = require('./replys');

const router = express.Router();

const {protect, authorize} = require('../middleware/auth');

// tags
router.route('/tags').get(getTags).post(protect, authorize('admin', 'staff'), createTags).delete(protect, authorize('admin', 'staff'), deleteTags);

//Re-route into other resource routers
router.use('/:hotelId/bookings', bookingRouter);
router.use('/:hotelId/rooms', roomRouter);
router.use('/:hotelId/reviews', reviewRouter)
router.use('/:hotelId/replys', replyRouter)

router.route('/').get(getHotels).post(protect, authorize('admin'), createHotel);
router.route('/:id/tags').put(protect, authorize('admin', 'staff'), addHotelTags).delete(protect, authorize('admin', 'staff'), removeHotelTags);
router.route('/:id').get(getHotel).put(protect, authorize('admin'), updateHotel).delete(protect, authorize('admin'), deleteHotel);

module.exports = router;