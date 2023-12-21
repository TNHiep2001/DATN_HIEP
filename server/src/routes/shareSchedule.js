const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  createShareSchedule,
  getListShareSchedule,
} = require("../controllers/shareScheduleController");

// Thiết lập multer để xử lý FormData
const upload = multer();

router.post("/create", upload.none(), createShareSchedule);
router.get("/getListShareSchedule", upload.none(), getListShareSchedule);

module.exports = router; // như là export default
