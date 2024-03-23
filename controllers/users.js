const User = require('../models/User');

exports.getUser = async (req, res, next) => {
    let query;
    //General users can see only their bookings!
    if(req.user.role !== 'admin'){
        query = User.findById(req.params.id);
    } else { //If you are an admin, you can see all!
            //console.log(req.params.hotelId);
            query = User.findById(req.params.id);
    }
    try{
        const user = await query;
        res.status(200).json({ success: true, data: user.name });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message : "Cannot find user" });
    }
}