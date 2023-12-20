const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  register,
  login,
  changePassword,
  getInfoUser,
  getListUser,
} = require("../controllers/userController");

// Thiết lập multer để xử lý FormData
const upload = multer();

router.post("/register", upload.none(), register);
router.post("/login", upload.none(), login);
router.put("/changePassword", upload.none(), changePassword);
router.get("/profile", upload.none(), getInfoUser);
router.get("/getListUser", upload.none(), getListUser);

module.exports = router; // như là export default
