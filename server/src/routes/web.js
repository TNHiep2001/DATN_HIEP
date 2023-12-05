const express = require('express')
const { getHomePage, getCheckVar } = require('../controllers/homeController')
const router = express.Router()

router.get('/', getHomePage)

router.get('/ejs', getCheckVar)

module.exports = router // như là export default
