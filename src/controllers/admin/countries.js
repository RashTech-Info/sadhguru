const countryPageModel = require("../../model/countriesPage"); // adjust path as needed
const country = require("../../model/countries");

//add countries ----------
exports.addCountry = async (req, res) => {
  try {
    const { name } = req.body;
    const capitalizedName =
      name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

    // Check for duplicate (case-insensitive)
    const existing = await country.findOne({
      name: { $regex: `^${capitalizedName}$`, $options: "i" },
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Country with this name already exists",
      });
    }

    const newCountry = new country({ name: capitalizedName });
    await newCountry.save();

    res.status(201).json({
      success: true,
      message: "Country added successfully",
      data: newCountry,
    });
  } catch (error) {
    console.log("Add country error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

//update countries -------
exports.updateCountry = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const capitalizedName =
      name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

    // Check for duplicate (excluding the current ID)
    const duplicate = await country.findOne({
      _id: { $ne: id },
      name: { $regex: `^${capitalizedName}$`, $options: "i" },
    });

    if (duplicate) {
      return res.status(400).json({
        success: false,
        message: "Another country with this name already exists",
      });
    }

    const updated = await country.findByIdAndUpdate(
      id,
      { name: capitalizedName },
      { new: true }
    );

    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Country not found" });
    }

    res.status(200).json({
      success: true,
      message: "Country updated successfully",
      data: updated,
    });
  } catch (error) {
    console.log("Update country error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Delete Country ------
exports.deleteCountry = async (req, res) => {
  try {
    const deleted = await country.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Country not found" });
    }

    res.status(200).json({
      success: true,
      message: "Country deleted successfully",
    });
  } catch (error) {
    console.log("Delete country error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get All Countries ----------
exports.getAllCountries = async (req, res) => {
  try {
    const countries = await country.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: countries });
  } catch (error) {
    console.log("Get countries error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get All country page -----------
exports.getAllCountriePage = async (req, res) => {
  try {
    const countries = await countryPageModel.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: countries,
    });
  } catch (error) {
    console.log("Error fetching countries:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// getbyid country page -----------
exports.getCountryPageById = async (req, res) => {
  try {
    const { id } = req.params;
    const country = await countryPageModel.findById(id);

    if (!country) {
      return res.status(404).json({ success: false, message: "Country not found" });
    }

    res.status(200).json({ success: true, data: country });
  } catch (error) {
    console.log("Error fetching country:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ADD -------------------
exports.addCountryPage = async (req, res) => {
  try {
    const {
      countryName,
      discription,
      whyChoose,
      costBreakdown,
      topUniversities,
      faq,
      gallery,
    } = req.body;

    // Helper to parse JSON if sent as strings
    const parseIfJSON = (value) => {
      try {
        return typeof value === "string" ? JSON.parse(value) : value;
      } catch {
        return value;
      }
    };

    // Handle multiple images (if using multer fields)
    const countryImage = req.files?.countryImage
      ? req.files.countryImage[0].filename
      : null;

    const flagImage = req.files?.flagImage
      ? req.files.flagImage[0].filename
      : null;

    const galleryImages = req.files?.gallery
      ? req.files.gallery.map((file) => file.filename)
      : parseIfJSON(gallery);

    const newCountry = new countryPageModel({
      countryName,
      countryImage,
      flagImage,
      discription,
      whyChoose: parseIfJSON(whyChoose),
      costBreakdown: parseIfJSON(costBreakdown),
      topUniversities: parseIfJSON(topUniversities),
      faq: parseIfJSON(faq),
      gallery: galleryImages,
    });

    await newCountry.save();

    return res.status(201).json({
      success: true,
      message: "Country page added successfully",
      data: newCountry,
    });
  } catch (error) {
    console.log("Error adding country page:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// UPDATE -------------------
exports.updateCountryPage = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      countryName,
      discription,
      whyChoose,
      costBreakdown,
      topUniversities,
      faq,
      gallery,
    } = req.body;

    // Helper
    const parseIfJSON = (value) => {
      try {
        return typeof value === "string" ? JSON.parse(value) : value;
      } catch {
        return value;
      }
    };

    const countryImage = req.files?.countryImage
      ? req.files.countryImage[0].filename
      : null;

    const flagImage = req.files?.flagImage
      ? req.files.flagImage[0].filename
      : null;

    const galleryImages = req.files?.gallery
      ? req.files.gallery.map((file) => file.filename)
      : parseIfJSON(gallery);

    const updateData = {
      ...(countryName && { countryName }),
      ...(countryImage && { countryImage }),
      ...(flagImage && { flagImage }),
      ...(discription && { discription }),
      ...(whyChoose && { whyChoose: parseIfJSON(whyChoose) }),
      ...(costBreakdown && { costBreakdown: parseIfJSON(costBreakdown) }),
      ...(topUniversities && { topUniversities: parseIfJSON(topUniversities) }),
      ...(faq && { faq: parseIfJSON(faq) }),
      ...(galleryImages && { gallery: galleryImages }),
    };

    const updated = await countryPageModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Country not found" });
    }

    res.status(200).json({
      success: true,
      message: "Country updated successfully",
      data: updated,
    });
  } catch (error) {
    console.log("Error updating country:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


// delete ------------
exports.deleteCountryPage = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await countryPageModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Country not found" });
    }

    res.status(200).json({
      success: true,
      message: "Country deleted successfully",
    });
  } catch (error) {
    console.log("Error deleting country:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
