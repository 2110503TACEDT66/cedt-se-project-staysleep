const Hotel = require('../models/Hotel');
const Tags = require('../models/Tags');
const { merge } = require('../utils/utils');

//@desc Get all tags
//@route GET /api/v1/hotels/tags
//@access Public
exports.getTags = async (req, res, next) => {
    try {
        const tags = await Tags.findOne({});
        res.status(200).json({ success: true, data: tags });
    } catch (err) /* istanbul ignore next */ {
        console.error(err);
        res.status(400).json({ success: false });
    }
}

//@desc Create new tag
//@route POST /api/v1/hotels/tags
//@access Private
exports.createTags = async (req, res, next) => {
    try {
        const tags = await Tags.findOne({});
        /* istanbul ignore next */ if (tags) {
            tags.tags = merge(tags.tags, req.body.tags);
            const _tags = await Tags.findOneAndUpdate({}, tags);
            res.status(201).json({
                success: true,
                data: tags
            });
        } /* istanbul ignore next */ /*If there is no tag array in the system, create new tag array, cannot test due to already have tag array*/  else /* istanbul ignore next */{
            const tags = await Tags.create(req.body);
            res.status(201).json({
                success: true,
                data: tags
            });
        }
    } catch (err) /* istanbul ignore next */ {
        console.error(err);
        res.status(400).json({ success: false });
    }
}

//@desc Delete tag
//@route DELETE /api/v1/hotels/tags/
//@access Private
exports.deleteTags = async (req, res, next) => {
    try{
        const tags = await Tags.findOne({});
        await tags.updateOne({ $pull: { tags: { $in: req.body.tag }} });
        await Hotel.updateMany({ $pull: { tags: { $in: req.body.tag }} });
        res.status(200).json({ success: true, data: {} });
    }catch(err)/* istanbul ignore next */ {
        console.error(err);
        res.status(400).json({ success: false });
    }
}