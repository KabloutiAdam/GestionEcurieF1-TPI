const express = require('express');
const { getAllTracks } = require('../controllers/trackController');

const router = express.Router();


router.get('/', getAllTracks);




module.exports = router;