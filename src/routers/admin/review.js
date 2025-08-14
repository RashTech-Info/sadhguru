let {
  addReview,
  deleteReview,
  getActiveReviews,
  getAllReviews,
  updateReview,
} = require("../../controllers/admin/review");
let express = require("express");
let router = express.Router();
const auth = require("../../../auth/adminauth");
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

router.post("/addReview", upload.single("userImages"), addReview);
router.get("/getActiveReviews", getActiveReviews);
router.get("/getAllReviews", auth, getAllReviews);
router.patch("/updateReview/:id", auth, updateReview);
router.delete("/deleteReview/:id", auth, deleteReview);

module.exports = router;
