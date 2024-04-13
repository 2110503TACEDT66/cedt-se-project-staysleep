const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel",
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
    },
    star: {
      type: Number,
      required: true,
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

ReviewSchema.virtual("replys", {
  ref: "Reply",
  localField: "_id",
  foreignField: "review",
  justOne: false,
});

module.exports = mongoose.model("Review", ReviewSchema);
