const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: { type: String },
  number: {
    type: Number,
  },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  zipCode: { type: String },
  prefredCountry: { type: String },
  description: { type: String },
  status: { type: String, default: "New" },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const inquiryModel = mongoose.model("inquiry", inquirySchema);
module.exports = inquiryModel;
