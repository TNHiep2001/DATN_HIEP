const express = require("express");
const router = express.Router();
const multer = require("multer");
const { getListSchedule } = require("../controllers/scheduleController");

// Thiết lập multer để xử lý FormData
const upload = multer();

router.get("/create", upload.none(), getListSchedule);
router.get("/edit/:id", upload.none(), getListSchedule);
router.get("/delete/:id", upload.none(), getListSchedule);
router.get("/getInfo", upload.none(), getListSchedule);
router.get("/getDetail/:id", upload.none(), getListSchedule);

module.exports = router; // như là export default
