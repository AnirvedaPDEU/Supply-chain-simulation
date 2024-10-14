const express = require('express');
const router = express.Router();
const challengeController = require('../controllers/challenges.controllers');

router.post('/', challengeController.createChallenge);
router.get('/', challengeController.getAllChallenges);
router.get('/:id', challengeController.getChallengeById);
router.patch('/:id', challengeController.updateChallenge);
router.delete('/:id', challengeController.deleteChallenge);

module.exports = router;
