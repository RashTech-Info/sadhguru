const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema({
  name: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const countryModel = mongoose.model("countries", countrySchema);
module.exports = countryModel;
