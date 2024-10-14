const express = require('express');
const router = express.Router();
const submissionController = require('../controllers/submission.controllers');
const {authenticateToken} = require('../middleware/auth')

router.post('/', submissionController.createSubmission);
router.get('/', submissionController.getAllSubmissions);
router.get('/:id', submissionController.getSubmissionById);
router.put('/:id', submissionController.updateSubmission);
router.delete('/:id', submissionController.deleteSubmission);
router.post('/submission',authenticateToken,submissionController.evaluateScore);

module.exports = router;
