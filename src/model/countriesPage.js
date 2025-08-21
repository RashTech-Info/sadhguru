const mongoose = require("mongoose");

const countryPageSchema = new mongoose.Schema({
  countryName: { type: String },
  countryImage: { type: String }, // cover image -----------
  flagImage: { type: String },
  faq: [
    {
      heading: { type: String },
      content: { type: String },
    },
  ],
  discription: { type: String },
  whyChoose: [String],   //live in --------------------
  costBreakdown: [    // study cost ---------------
    {
      title: { type: String }, // e.g., "Tuition Fee", "Hostel", etc.
      min: { type: Number }, // e.g., 50000
      max: { type: Number }, // e.g., 100000
    },
  ],
  topUniversities: [
    {
      name: { type: String },
      link: { type: String },
    },
  ],
  gallery: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const countryPageModel = mongoose.model("countriespage", countryPageSchema);
module.exports = countryPageModel;
