const express = require('express');
const {getReplys,getReply,createReply,updateReply,deleteReply} = require('../controllers/replys');

// Include other resource routers
//const replyRouter = require('./replys');
const router = express.Router({mergeParams: true});

const {protect, authorize} = require('../middleware/auth');
//router.use('/:hotelId/replys', replyRouter)

router.route('/').get(getReplys).post(protect, authorize('admin','staff'), createReply);
router.route('/:id').get(getReply).put(protect, authorize('admin','staff'), updateReply).delete(protect, authorize('admin','staff'), deleteReply);

module.exports = router;