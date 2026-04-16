const express = require('express');
const reportController = require('../../controllers/annonce/reportController');

const router = express.Router();

// Define your route
router.get('/:id', reportController.generateReport);

module.exports = router;