const express = require("express");
const { getHomePage, getCheckVar } = require("../controllers/homeController");
const router = express.Router();
const multer = require("multer");

// Thiết lập multer để xử lý FormData
const upload = multer();

router.get("/", getHomePage);

router.get("/ejs", getCheckVar);

module.exports = router; // như là export default
