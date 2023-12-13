const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  createClassroom,
  updateClassroom,
  deleteClassroom,
  getInfoClassroom,
  getDetailClassroom,
} = require("../controllers/classroomController");

// Thiết lập multer để xử lý FormData
const upload = multer();

router.post("/create", upload.none(), createClassroom);
router.put("/edit/:id", upload.none(), updateClassroom);
router.delete("/delete/:id", upload.none(), deleteClassroom);
router.get("/getInfo", upload.none(), getInfoClassroom);
router.get("/getDetail/:id", upload.none(), getDetailClassroom);

module.exports = router; // như là export default
