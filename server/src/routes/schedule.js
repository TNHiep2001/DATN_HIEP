const express = require('express')
const router = express.Router()
const multer = require('multer')
const { getListSchedule } = require('../controllers/scheduleController')

// Thiết lập multer để xử lý FormData
const upload = multer()

router.get('/getListSchedule', upload.none(), getListSchedule)

module.exports = router // như là export default
