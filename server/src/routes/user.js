const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  createUser,
  login,
  changePassword,
  getInfoUser,
  getListUser,
  getListInfoUser,
  updateUser,
  deleteUser,
  getDetailUser,
} = require("../controllers/userController");

// Thiết lập multer để xử lý FormData
const upload = multer();

router.post("/login", upload.none(), login);
router.put("/changePassword", upload.none(), changePassword);
router.get("/profile", upload.none(), getInfoUser);
router.get("/getListUser", upload.none(), getListUser);
router.get("/getListInfoUser", upload.none(), getListInfoUser);
router.post("/create", upload.none(), createUser);
router.put("/edit/:id", upload.none(), updateUser);
router.delete("/delete/:id", upload.none(), deleteUser);
router.get("/getDetail/:id", upload.none(), getDetailUser);

module.exports = router; // như là export default
