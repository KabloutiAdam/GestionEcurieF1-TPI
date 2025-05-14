const express = require('express');
const { getAllTeams, addTeam, updateTeam } = require('../controllers/teamController');
const router = express.Router();



router.get('/', getAllTeams);
router.post('/add', addTeam)
router.put('/update', updateTeam)

module.exports = router;