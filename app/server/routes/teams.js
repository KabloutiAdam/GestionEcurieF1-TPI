const express = require('express');
const { getAllTeams, addTeam, updateTeam, deleteTeam } = require('../controllers/teamController');
const router = express.Router();



router.get('/', getAllTeams);
router.post('/add', addTeam)
router.put('/update', updateTeam)
router.post('/delete', deleteTeam)
module.exports = router;