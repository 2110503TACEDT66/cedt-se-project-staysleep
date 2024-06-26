const Hotel = require('../models/Hotel');
const { merge } = require('../utils/utils');

//@desc Get all hotels
//@route GET /api/v1/hotels
//@access Public
exports.getHotels = async (req, res, next) => {
    let query;
    // Copy req.query
    const reqQuery = { ...req.query };
    
    // Fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit', 'tags'];

    let tags = [];
    let meeTag = false;
    // tags
    if(req.query.tags){
        tags = req.query.tags.split(',');
        meeTag = true;
    }
    console.log(tags);

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);
    console.log(reqQuery);

    // Create query string
    if (meeTag) {
        reqQuery.tags = {"$all" : tags};
    }
    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    console.log(JSON.parse(queryStr))
    query = Hotel.find(JSON.parse(queryStr)).populate({
        path: 'rooms',
        populate: {
            path: 'bookings',
            select: 'bookingbegin bookingend',
        },
    }).populate({
        path: 'reviews',
        populate: {
            path: 'replys',
            select: 'message user createdAt',
        }
    }).populate({
        path: 'reviews',
        populate: {
            path: 'user', 
            select: 'name',
        }
    }).populate({
        path: 'reviews',
        populate: {
            path: 'booking'
        },
    });


    // Select Fields
    if(req.query.select){
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }

    // Sort
    if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    } else {
        query = query.sort('name');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page - 1) * limit
    const endIndex = page * limit;

    try{
        const total = await Hotel.countDocuments();

        query = query.skip(startIndex).limit(limit);

        // Executing query
        const hotels = await query;
        
        // Pagination result
        const pagination = {};
        if(endIndex < total){
            pagination.next = {
                page: page + 1,
                limit
            }
        }

        if(startIndex > 0){
            pagination.prev = {
                page: page - 1,
                limit
            }
        }

        res.status(200).json({ success: true, count: hotels.length, pagination, data: hotels });
    }catch(err){
        console.log(err.stack);
        res.status(400).json({ success: false });
    }
}

//@desc Get single hotel
//@route GET /api/v1/hotels/:id
//@access Public
exports.getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id).populate({
            path: 'rooms',
            populate: {
                path: 'bookings',
                select: 'bookingbegin bookingend',
            },
        }).populate({
            path: 'reviews',
            populate: {
                path: 'replys',
                select: 'message user createdAt',
            }
        }).populate({
            path: 'reviews',
            populate: {
                path: 'user', 
                select: 'name',
            },
        }).populate({
            path: 'reviews',
            populate: {
                path: 'booking'
            },
        });

        if (!hotel) {
            return res.status(404).json({ success: false, message: `No Hotel with the ID of ${req.params.id}` });
        }

        res.status(200).json({ success: true, data: hotel });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

//@desc Create new hotel
//@route POST /api/v1/hotels
//@access Private
exports.createHotel = async (req, res, next) => {
    const hotel = await Hotel.create(req.body);
    res.status(201).json({
        success: true,
        data: hotel
    });
}

//@desc Update hotel
//@route PUT /api/v1/hotels/:id
//@access Private
exports.updateHotel = async (req, res, next) => {
    try{
        const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if(!hotel){
            return res.status(400).json({ success: false, message: `No Hotel with the ID of ${req.param.id}` });
        }

        res.status(200).json({ success: true, data: hotel });
    }catch (err){
        res.status(400).json({ success: false });
    }
}

//@desc Delete hotel
//@route DELETE /api/v1/hotels/:id
//@access Private
exports.deleteHotel = async (req, res, next) => {
    try{
        const hotel = await Hotel.findById(req.params.id);
        if(!hotel){
            return res.status(400).json({ success: false, message: `No Hotel with the ID of ${req.param.id}` });
        }
        await hotel.deleteOne();
        res.status(200).json({ success: true, data: {} });
    }catch(err){
        res.status(400).json({ success: false });
    }
}

//@desc Add Tags to Hotel
//@route PUT /api/v1/hotels/:id/tags
//@access Private
exports.addHotelTags = async (req, res, next) => {
    if (!req.body.tags || !(req.body.tags instanceof Array) || req.body.tags.length === 0) {
        return res.status(400).json({ success: false });
    }
    try { 
        const tags = await Hotel.findById(req.params.id);
        tags.tags = merge(tags.tags, req.body.tags);
        const hotel = await Hotel.findByIdAndUpdate(req.params.id, tags );

        const _hotel = await Hotel.findById(req.params.id);
        res.status(200).json({ success: true, data: _hotel });
    } catch (err) {
        res.status(400).json({ success: false, message: "Can't add Tags to Hotel (Server Error)" });
    }
};

//@desc Remove hotel tags
//@route DELETE /api/v1/hotels/:id/tags
//@access Private
exports.removeHotelTags = async (req, res, next) => {
    try{
        const hotel = await Hotel.findByIdAndUpdate(req.params.id, {$pull: { tags: { $in: req.body.tag }}} );
        const _hotel = await Hotel.findById(req.params.id);
        res.status(200).json({ success: true, data: _hotel });
    }catch(err){
        res.status(400).json({ success: false });
        console.log(err);
    }
}

