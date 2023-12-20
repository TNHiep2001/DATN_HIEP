const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  createSchedule,
  updateSchedule,
  deleteSchedule,
  getInfoSchedule,
  getDetailSchedule,
  getFullSchedule,
  getShareSchedule,
} = require("../controllers/scheduleController");

// Thiết lập multer để xử lý FormData
const upload = multer();

router.post("/create", upload.none(), createSchedule);
router.put("/edit/:id", upload.none(), updateSchedule);
router.delete("/delete/:id", upload.none(), deleteSchedule);
router.get("/getInfo", upload.none(), getInfoSchedule);
router.get("/getDetail/:id", upload.none(), getDetailSchedule);
router.get("/getFullSchedule", upload.none(), getFullSchedule);
router.get("/getShareSchedule/:id", upload.none(), getShareSchedule);

module.exports = router; // như là export default
