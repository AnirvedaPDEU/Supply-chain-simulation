const challengeSchema = require('../models/challenges.model');

// Create a Challenge
const createChallenge = async (req, res) => {
    const challenge = new challengeSchema(req.body);
    try {
        const savedChallenge = await challenge.save();
        res.status(201).json(savedChallenge);
    } catch (error) {
        console.error('Error creating challenge:', error); 
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation error', details: error.errors });
        }
        res.status(500).json({ message: 'Internal server error', details: error.message });
    }
};

// Read All Challenges
const getAllChallenges = async (req, res) => {
    try {
        const challenges = await challengeSchema.find();
        res.status(200).json(challenges);
    } catch (error) {
        console.error('Error retrieving challenges:', error); // Log the error for debugging
        res.status(500).json({ message: 'Internal server error', details: error.message });
    }
};

// Read a Specific Challenge
const getChallengeById = async (req, res) => {
    try {
        const challenge = await challengeSchema.findById(req.params.id);
        if (!challenge) {
            return res.status(404).json({ message: 'Challenge not found' });
        }
        res.status(200).json(challenge);
    } catch (error) {
        console.error('Error retrieving challenge:', error); // Log the error for debugging
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid challenge ID format' });
        }
        res.status(500).json({ message: 'Internal server error', details: error.message });
    }
};

// Update a Challenge
const updateChallenge = async (req, res) => {
    try {
        const updatedChallenge = await challengeSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedChallenge) {
            return res.status(404).json({ message: 'Challenge not found' });
        }
        res.status(200).json(updatedChallenge);
    } catch (error) {
        console.error('Error updating challenge:', error); // Log the error for debugging
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation error', details: error.errors });
        }
        res.status(500).json({ message: 'Internal server error', details: error.message });
    }
};

// Delete a Challenge
const deleteChallenge = async (req, res) => {
    try {
        const deletedChallenge = await challengeSchema.findByIdAndDelete(req.params.id);
        if (!deletedChallenge) {
            return res.status(404).json({ message: 'Challenge not found' });
        }
        res.status(200).json({ message: 'Challenge deleted' });
    } catch (error) {
        console.error('Error deleting challenge:', error); // Log the error for debugging
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid challenge ID format' });
        }
        res.status(500).json({ message: 'Internal server error', details: error.message });
    }
};

module.exports = {
    createChallenge,
    getAllChallenges,
    getChallengeById,
    updateChallenge,
    deleteChallenge
};
