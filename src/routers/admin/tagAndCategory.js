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
router.post("/tag",  addTag);
router.get("/tag", getAllTags);
router.put("/tag/:id",  updateTag);
router.delete("/tag/:id",  deleteTag);

// category -------------
router.post("/addCategory",  addCategory);
router.put("/updateCategory/:id",  updateCategory);
router.delete("/deleteCategory/:id",  deleteCategory);
router.get("/getAllCategory", getAllCategories);
module.exports = router;
