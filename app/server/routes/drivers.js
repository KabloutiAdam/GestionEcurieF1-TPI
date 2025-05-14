const express = require('express');
const router = express.Router();
const { getAllDrivers, addDriver, updateDriver } = require('../controllers/driverController');


router.get('/', getAllDrivers);
router.post('/add', addDriver)
router.put('/update', updateDriver)

module.exports = router;