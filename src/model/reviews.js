const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  whichUniversity: { type: String },
  rating: {
    type: Number,
  },
  description: { type: String },
  country: { type: String },
  batch: { type: String },
  userImages: { type: String },
  toggle: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const reviewModel = mongoose.model("review", reviewSchema);
module.exports = reviewModel;
