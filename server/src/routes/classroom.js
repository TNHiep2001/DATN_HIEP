const express = require('express')
const router = express.Router()
const multer = require('multer')
const {
  createClassroom,
  updateClassroom,
  deleteClassroom,
  getInfoClassroom
} = require('../controllers/classroomController')

// Thiết lập multer để xử lý FormData
const upload = multer()

router.post('/create', upload.none(), createClassroom)
router.put('/update', upload.none(), updateClassroom)
router.delete('/delete', upload.none(), deleteClassroom)
router.get('/getInfo', upload.none(), getInfoClassroom)

module.exports = router // như là export default
