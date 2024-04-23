const mongoose = require('mongoose');

const TagsSchema = new mongoose.Schema({
    tags: {
        type: [String],
        required: false,
    }
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

module.exports = mongoose.model('Tags', TagsSchema);