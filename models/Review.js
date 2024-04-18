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
    booking:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
        required: true,
    },
    message: {
      type: String,
      required: true,
    },
    star: {
      type: Number,
      required: true,
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

ReviewSchema.virtual("replys", {
  ref: "Reply",
  localField: "_id",
  foreignField: "review",
  justOne: false,
});

ReviewSchema.virtual("users", {
  ref: "User",
  localField: "_id",
  foreignField: "review",
  justOne: false,
});

ReviewSchema.virtual("bookings", {
  ref: "Booking",
  localField: "_id",
  foreignField: "review",
  justOne: false,
});

module.exports = mongoose.model("Review", ReviewSchema);
