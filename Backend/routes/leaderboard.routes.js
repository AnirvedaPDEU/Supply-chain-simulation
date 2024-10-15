const express = require('express');
const router = express.Router();
const leaderboardController = require('../controllers/leaderboard.controllers');

router.get('/', leaderboardController.getLeaderboard);

module.exports = router;
