const express = require("express");
const router = express.Router();
const {
  addTag,
  deleteTag,
  getAllTags,
  updateTag,
  addCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} = require("../../controllers/admin/tagAndCategory");
const auth = require("../../../auth/adminauth");

// tags ------------------
router.post("/tag", auth, addTag);
router.get("/tag", getAllTags);
router.put("/tag/:id", auth, updateTag);
router.delete("/tag/:id", auth, deleteTag);

// category -------------
router.post("/addCategory", auth, addCategory);
router.put("/updateCategory/:id", auth, updateCategory);
router.delete("/deleteCategory/:id", auth, deleteCategory);
router.get("/getAllCategory", getAllCategories);
module.exports = router;
