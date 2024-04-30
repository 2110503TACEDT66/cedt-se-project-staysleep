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
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("Reply", ReplySchema);
