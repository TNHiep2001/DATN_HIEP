const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  createShareSchedule,
} = require("../controllers/shareScheduleController");

// Thiết lập multer để xử lý FormData
const upload = multer();

router.post("/create", upload.none(), createShareSchedule);

module.exports = router; // như là export default
