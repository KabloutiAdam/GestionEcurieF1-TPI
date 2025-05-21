const express = require('express');
const router = express.Router();
const { getAllDrivers, addDriver, updateDriver, updateDriverTeam, updateDriverPoints, getAllDriversInATeam } = require('../controllers/driverController');


router.get('/', getAllDrivers);
router.get('/getDriverInATeam', getAllDriversInATeam)
router.post('/add', addDriver)
router.put('/update', updateDriver)
router.post('/updateTeam', updateDriverTeam)
router.put('/updatePoints', updateDriverPoints)

module.exports = router;