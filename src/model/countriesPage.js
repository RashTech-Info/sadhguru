const mongoose = require("mongoose");

const countryPageSchema = new mongoose.Schema({
  countryName: { type: String },
  countryImage: { type: String },
  fees: {
    min: { type: Number },
    max: { type: Number },
  },
  duration: {
    min: { type: Number },
    max: { type: Number },
  },
  intake: { type: String },
  language: [String],
  eligibility: [String],
  whyChoose: [String],
  costBreakdown: [
    {
      title: { type: String },       // e.g., "Tuition Fee", "Hostel", etc.
      min: { type: Number },         // e.g., 50000
      max: { type: Number },         // e.g., 100000
      unit: { type: String },        // Optional: "₹/year", "Lakhs/year", etc.
    }
  ],
    topUniversities: [
    {
      name: { type: String },    
      link: { type: String },        
    }
  ],
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const countryPageModel = mongoose.model("countriespage", countryPageSchema);
module.exports = countryPageModel;
