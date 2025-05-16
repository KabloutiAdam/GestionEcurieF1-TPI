const express = require('express');
const router = express.Router();
const { getAllDrivers, addDriver, updateDriver, updateDriverTeam } = require('../controllers/driverController');


router.get('/', getAllDrivers);
router.post('/add', addDriver)
router.put('/update', updateDriver)
router.post('/updateTeam', updateDriverTeam)

module.exports = router;