const tagModel = require("../../model/tags");
const categoryModel = require("../../model/category");

// Add Tag
exports.addTag = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name?.trim()) return res.status(400).json({ message: "Tag name is required" });

    // Check for duplicate tag (case-insensitive)
    const existing = await tagModel.findOne({ name: { $regex: `^${name}$`, $options: "i" } });
    if (existing) return res.status(400).json({ message: "Tag with this name already exists" });

    const newTag = new tagModel({ name: name.trim() });
    await newTag.save();
    res.status(201).json(newTag);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get All Tags
exports.getAllTags = async (req, res) => {
  try {
    const tags = await tagModel.find().sort({ createdAt: -1 });
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update Tag
exports.updateTag = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name?.trim()) return res.status(400).json({ message: "Tag name is required" });

    // Check if another tag with same name exists
    const existing = await tagModel.findOne({
      _id: { $ne: id },
      name: { $regex: `^${name}$`, $options: "i" }
    });
    if (existing) return res.status(400).json({ message: "Another tag with this name exists" });

    const updatedTag = await tagModel.findByIdAndUpdate(
      id,
      { name: name.trim() },
      { new: true }
    );

    if (!updatedTag) return res.status(404).json({ message: "Tag not found" });

    res.status(200).json(updatedTag);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete Tag
exports.deleteTag = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await tagModel.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Tag not found" });

    res.status(200).json({ message: "Tag deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


//category -----------

// Helper to normalize name (trim + lowercase for comparison)
const normalizeName = (name) => name.trim().toLowerCase();

// Add Category
exports.addCategory = async (req, res) => {
  try {
    const name = req.body.name?.trim();
    if (!name) return res.status(400).json({ message: "Name is required" });

    const existing = await categoryModel.findOne({
      name: { $regex: `^${normalizeName(name)}$`, $options: "i" }
    });
    if (existing) return res.status(400).json({ message: "Category already exists" });

    const newCategory = await categoryModel.create({ name });
    res.status(201).json({ message: "Category created", data: newCategory });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update Category
exports.updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const name = req.body.name?.trim();
    if (!name) return res.status(400).json({ message: "Name is required" });

    const existing = await categoryModel.findOne({
      _id: { $ne: id },
      name: { $regex: `^${normalizeName(name)}$`, $options: "i" }
    });
    if (existing) return res.status(400).json({ message: "Another category with the same name exists" });

    const updated = await categoryModel.findByIdAndUpdate(id, { name }, { new: true });
    if (!updated) return res.status(404).json({ message: "Category not found" });

    res.status(200).json({ message: "Category updated", data: updated });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete Category
exports.deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await categoryModel.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Category not found" });

    res.status(200).json({ message: "Category deleted", data: deleted });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get All Categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find().sort({ createdAt: -1 });
    res.status(200).json({ data: categories });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

