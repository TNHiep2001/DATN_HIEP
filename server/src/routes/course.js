const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  createCourse,
  getInfoCourse,
  getDetailCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");

// Thiết lập multer để xử lý FormData
const upload = multer();

router.post("/create", upload.none(), createCourse);
router.put("/edit/:id", upload.none(), updateCourse);
router.delete("/delete/:id", upload.none(), deleteCourse);
router.get("/getInfo", upload.none(), getInfoCourse);
router.get("/getDetail/:id", upload.none(), getDetailCourse);

module.exports = router; // như là export default
