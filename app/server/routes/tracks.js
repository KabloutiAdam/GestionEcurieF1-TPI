const express = require('express');
const { getAllTracks, deleteTrack, addTrack, updateTrack } = require('../controllers/trackController');

const router = express.Router();


router.get('/', getAllTracks);
router.post("/add", addTrack)
router.post("/delete", deleteTrack)
router.post("/update", updateTrack)



module.exports = router;