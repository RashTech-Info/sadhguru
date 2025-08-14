const express = require("express");
const router = express.Router();
const {
  addBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
} = require("../../controllers/admin/blog");
let auth = require("../../../auth/adminauth");
const multer = require("multer");

let upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "_" + file.originalname);
    },
  }),
});

// Create a new blog
router.post("/addBlog", auth,upload.single("image"), addBlog);

// Update an existing blog
router.patch("/updateBlog/:id", auth, upload.single("image"),updateBlog);

// Delete a blog
router.delete("/deleteBlog/:id", auth, deleteBlog);

// Get all blogs
router.get("/getAllBlogs", getAllBlogs);

// Get blog by ID
router.get("/getBlog/:id", getBlogById);

module.exports = router;
