const TeamSchema = require('../models/teams.model');

// Create a Team
const createTeam = async (req, res) => {
    const team = new TeamSchema(req.body);
    try {
        const savedTeam = await team.save();
        res.status(201).json(savedTeam);
    } catch (error) {
        console.error('Error creating team:', error); // Log the error for debugging
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation error', details: error.errors });
        }
        res.status(500).json({ message: 'Internal server error', details: error.message });
    }
};

// Get All Teams
const getAllTeamSchema = async (req, res) => {
    try {
        const teams = await TeamSchema.find();
        res.status(200).json(teams);
    } catch (error) {
        console.error('Error retrieving teams:', error); // Log the error for debugging
        res.status(500).json({ message: 'Internal server error', details: error.message });
    }
};

// Read a Specific Team
const getTeamById = async (req, res) => {
    try {
        const team = await TeamSchema.findById(req.params.id);
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }
        res.status(200).json(team);
    } catch (error) {
        console.error('Error retrieving team:', error); // Log the error for debugging
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid team ID format' });
        }
        res.status(500).json({ message: 'Internal server error', details: error.message });
    }
};

// Update a Team
const updateTeam = async (req, res) => {
    try {
        const updatedTeam = await TeamSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTeam) {
            return res.status(404).json({ message: 'Team not found' });
        }
        res.status(200).json(updatedTeam);
    } catch (error) {
        console.error('Error updating team:', error); // Log the error for debugging
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation error', details: error.errors });
        }
        res.status(500).json({ message: 'Internal server error', details: error.message });
    }
};

// Delete a Team
const deleteTeam = async (req, res) => {
    try {
        const deletedTeam = await TeamSchema.findByIdAndDelete(req.params.id);
        if (!deletedTeam) {
            return res.status(404).json({ message: 'Team not found' });
        }
        res.status(200).json({ message: 'Team deleted' });
    } catch (error) {
        console.error('Error deleting team:', error); // Log the error for debugging
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid team ID format' });
        }
        res.status(500).json({ message: 'Internal server error', details: error.message });
    }
};

module.exports = {
    createTeam,
    getAllTeamSchema,
    getTeamById,
    updateTeam,
    deleteTeam
};
