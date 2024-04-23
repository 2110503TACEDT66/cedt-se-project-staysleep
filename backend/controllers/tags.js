//@desc Get all tags
//@route GET /api/v1/hotels/tags
//@access Public
exports.getTags = async (req, res, next) => {
    try{
        const tags = await Tags.findOne({});
        res.status(200).json({ success: true, data: tags });
    }catch(err){
        res.status(400).json({ success: false });
    }
}

//@desc Create new tag
//@route POST /api/v1/hotels/tags
//@access Private
exports.createTags = async (req, res, next) => {
    try {
        const tags = await Tags.findOne({});
        if (tags) {
            // merge tags
            const merge = (a, b, predicate = (a, b) => a === b) => {
                const c = [...a]; // copy to avoid side effects
                // add all items from B to copy C if they're not already present
                b.forEach((bItem) => (c.some((cItem) => predicate(bItem, cItem)) ? null : c.push(bItem)))
                return c;
            }
            tags.tags = merge(tags.tags, req.body.tags);
            
            const _tags = await Tags.findOneAndUpdate({}, tags);
            res.status(201).json({
                success: true,
                data: tags
            });
        } else {
            const tags = await Tags.create(req.body);
            res.status(201).json({
                success: true,
                data: tags
            });
        }
    } catch (err) {
        console.error(err);
        res.status(400).json({ success: false });
    }
}