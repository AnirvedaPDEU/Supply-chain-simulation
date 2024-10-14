const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teams.controllers');
const { authenticateToken } = require('../middleware/auth');

router.post('/register',teamController.registerTeam);
router.post('/login',teamController.loginTeam);
router.get('/', teamController.getAllTeamSchema);
router.get('/:id',authenticateToken, teamController.getTeamById);
router.patch('/:id', teamController.updateTeam);
router.delete('/:id', teamController.deleteTeam);

module.exports = router;
