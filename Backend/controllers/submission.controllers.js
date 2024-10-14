const SubmissionSchema = require('../models/submissions.model');
const challengeSchema = require('../models/challenges.model');
const teamSchema = require('../models/teams.model');


// Create a Submission
const createSubmission = async (req, res) => {
    const submission = new SubmissionSchema(req.body);
    try {
        const savedSubmission = await submission.save();
        res.status(201).json(savedSubmission);
    } catch (error) {
        console.error('Error creating submission:', error); // Log the error for debugging
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation error', details: error.errors });
        }
        res.status(500).json({ message: 'Internal server error', details: error.message });
    }
};

// Read All SubmissionSchema
const getAllSubmissions = async (req, res) => {
    try {
        const submissions = await SubmissionSchema.find().populate('team_id challenge_id');
        res.status(200).json(submissions);
    } catch (error) {
        console.error('Error retrieving submissions:', error); // Log the error for debugging
        res.status(500).json({ message: 'Internal server error', details: error.message });
    }
};

// Read a Specific Submission
const getSubmissionById = async (req, res) => {
    try {
        const submission = await SubmissionSchema.findById(req.params.id).populate('team_id challenge_id');
        if (!submission) return res.status(404).json({ message: 'Submission not found' });
        res.status(200).json(submission);
    } catch (error) {
        console.error('Error retrieving submission:', error); // Log the error for debugging
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid submission ID format' });
        }
        res.status(500).json({ message: 'Internal server error', details: error.message });
    }
};

// Update a Submission
const updateSubmission = async (req, res) => {
    try {
        const updatedSubmission = await SubmissionSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSubmission) return res.status(404).json({ message: 'Submission not found' });
        res.status(200).json(updatedSubmission);
    } catch (error) {
        console.error('Error updating submission:', error); // Log the error for debugging
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation error', details: error.errors });
        }
        res.status(500).json({ message: 'Internal server error', details: error.message });
    }
};

// Delete a Submission
const deleteSubmission = async (req, res) => {
    try {
        const deletedSubmission = await SubmissionSchema.findByIdAndDelete(req.params.id);
        if (!deletedSubmission) return res.status(404).json({ message: 'Submission not found' });
        res.status(200).json({ message: 'Submission deleted' });
    } catch (error) {
        console.error('Error deleting submission:', error); // Log the error for debugging
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid submission ID format' });
        }
        res.status(500).json({ message: 'Internal server error', details: error.message });
    }
};

const evaluateScore = async (req, res) => {
    const { teamId, challengeId, selectedOption } = req.body; 

    try {
        // Find the Challenge
        const challenge = await challengeSchema.findById(challengeId);
        if (!challenge) return res.status(404).json({ message: 'Challenge not found' });

        // Find the selected option in the challenge options
        const option = challenge.options.find(opt => opt.option_text === selectedOption);
        if (!option) return res.status(404).json({ message: 'Selected option not found in challenge' });

        // Find the Team and its category
        const team = await teamSchema.findById(teamId);
        if (!team) return res.status(404).json({ message: 'Team not found' });

        const category = team.category; // Assuming `category` is a field in the Team schema

        // Get the score for the specified category
        const pointsAwarded = option.scores[category];
        const feedback = option.feedback[category];

        if (pointsAwarded === undefined) return res.status(400).json({ message: 'Invalid category' });

        // Update the Team's score
        team.score += pointsAwarded;
        await team.save();

        const submission = new SubmissionSchema({
            team_id:teamId,
            challenge_id:challengeId,
            selected_option:selectedOption,
            score:pointsAwarded
        });
        await submission.save();

        res.status(201).json({ message: 'Score evaluated and team updated', pointsAwarded, feedback });
    } catch (error) {
        console.error('Error evaluating score:', error);
        res.status(500).json({ message: 'Internal server error', details: error.message });
    }
};


module.exports = {
    createSubmission,
    getAllSubmissions,
    getSubmissionById,
    updateSubmission,
    deleteSubmission,
    evaluateScore
}
