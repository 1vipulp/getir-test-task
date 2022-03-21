'use strict'

const router = require('express').Router()
const recordController = require('../controllers/records')

router.post('', recordController.fetchRecords)

module.exports = router