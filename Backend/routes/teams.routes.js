const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teams.controllers');

router.post('/', teamController.createTeam);
router.get('/', teamController.getAllTeamSchema);
router.get('/:id', teamController.getTeamById);
router.patch('/:id', teamController.updateTeam);
router.delete('/:id', teamController.deleteTeam);

module.exports = router;
