const express = require("express");
const router = express.Router();
const {
  addCountry,
  addCountryPage,
  deleteCountry,
  deleteCountryPage,
  getAllCountries,
  getCountryPageById,
  updateCountry,
  updateCountryPage,
  getAllCountriePage,
} = require("../../controllers/admin/countries");
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

// Country
router.post("/addCountry", addCountry);
router.get("/getAllCountry", getAllCountries);
router.put("/updateCountry/:id", updateCountry);
router.delete("/deleteCountry/:id", deleteCountry);

// country Pgae
router.post(
  "/addCountryPage",
  upload.fields([
    { name: "countryImage", maxCount: 1 },
    { name: "flagImage", maxCount: 1 },
    { name: "gallery", maxCount: 10 }, // multiple gallery images
  ]),
  addCountryPage
);
router.patch(
  "/updateCountryPage/:id",
  upload.fields([
    { name: "countryImage", maxCount: 1 },
    { name: "flagImage", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]),
  updateCountryPage
);
router.get("/getAllCountryPage", getAllCountriePage);
router.get("/getCountryPageById/:id", getCountryPageById);
router.delete("/deleteCountryPage/:id", deleteCountryPage);

module.exports = router;
