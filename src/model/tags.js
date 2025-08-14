const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const tagModel = mongoose.model("tag", tagSchema);
module.exports = tagModel;
