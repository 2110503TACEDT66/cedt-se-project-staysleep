const mongoose = require("mongoose");

const ReplySchema = new mongoose.Schema(
  {
    review: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "review",
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    message: {
      type: String,
      required: true,
      unique: true,
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("Review", ReplySchema);
