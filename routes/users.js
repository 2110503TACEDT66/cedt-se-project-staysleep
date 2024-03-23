const express = require('express');
const {getUser} = require('../controllers/users');

const router = express.Router({mergeParams: true});

const {protect, authorize} = require('../middleware/auth');

router.route('/:id').get(getUser)

module.exports = router;