const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const categoryModel = mongoose.model("category", categorySchema);
module.exports = categoryModel;
