const express = require('express');
const {getReplys,getReply,createReply,updateReply,deleteReply} = require('../controllers/replys');

// Include other resource routers

const router = express.Router({mergeParams: true});

const {protect, authorize} = require('../middleware/auth');

router.route('/').get(getReplys).post(protect, authorize('admin'), createReply);
router.route('/:id').get(getReply).put(protect, authorize('admin'), updateReply).delete(protect, authorize('admin'), deleteReply);

module.exports = router;