const Reply = require('../models/Reply')

//@desc Get all replys
//@route GET /api/v1/replys
//@access Public
exports.getReplys = async (req, res, next) => {
    
    try {
        const replys = await Reply.find();
        res.status(200).json({ success: true, count: replys.length, data: replys });
    } catch (err) {
        console.error(err.stack);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}

//@desc Get single reply
//@route GET /api/v1/replys/:id
//@access Public
exports.getReply = async (req, res, next) => {
    try{
        const reply = await Reply.findById(req.params.id);
        if(!reply){
            return res.status(400).json({ success: false, message: `No reply with the ID of ${req.param.id}` });
        }
        res.status(200).json({ success: true, data: reply });
    }catch (err){
        res.status(400).json({ success: false, error: "Internal Server Error"  });
    }
}


//@desc Create new reply
//@route POST /api/v1/replys
//@access Private
exports.createReply = async (req, res, next) => {
    try {
        const reply = await Reply.create(req.body);
        res.status(201).json({
            success: true,
            data: reply 
        });
    } catch (err) {
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}


//@desc Update reply
//@route PUT /api/v1/replys/:id
//@access Private
exports.updateReply = async (req, res, next) => {
    try{
        const reply = await Reply.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if(!reply){
            return res.status(400).json({ success: false, message: `No reply with the ID of ${req.param.id}` });
        }

        res.status(200).json({ success: true, data: reply });
    }catch (err){
        res.status(400).json({ success: false });
    }
}

//@desc Delete reply
//@route DELETE /api/v1/replys/:id
//@access Private
exports.deleteReply = async (req, res, next) => {
    try{
        const reply = await Reply.findById(req.params.id);
        if(!reply){
            return res.status(400).json({ success: false, message: `No reply with the ID of ${req.param.id}` });
        }
        await reply.deleteOne();
        res.status(200).json({ success: true, data: {} });
    }catch(err){
        res.status(400).json({ success: false });
    }
}