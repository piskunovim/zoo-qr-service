const express = require('express')
const router = express.Router()

const basicAuth = require("../utils/basicAuth")

const path = require('path')

router.use(function (req, res, next) {
	basicAuth(req,res,next)
})

router.get('/', (req, res) => res.sendFile(path.join(__dirname + '/../templates/management.html'))) 


module.exports = router