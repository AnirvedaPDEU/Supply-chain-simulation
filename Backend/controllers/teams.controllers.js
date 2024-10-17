require('dotenv').config()
const TeamSchema = require('../models/teams.model');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Create a Team
const registerTeam = async (req, res) => {
    const { team_name, password, team_members, category } = req.body;

    // Check if the team already exists (case-insensitive)
    const existingTeam = await TeamSchema.findOne({ team_name: team_name.toLowerCase() });
    if (existingTeam) {
        return res.status(400).json({ message: 'Team name already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const team = new TeamSchema({
        team_name: team_name.toLowerCase(), // Store team name in lowercase
        password: hashedPassword,
        team_members,
        category,
    });

    try {
        const savedTeam = await team.save();
        res.status(201).json(savedTeam);
    } catch (error) {
        console.error('Error registering team:', error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation error', details: error.errors });
        }
        res.status(500).json({ message: 'Internal server error', details: error.message });
    }
};

const loginTeam = async (req, res) => {
    const { team_name, password } = req.body;

    try {
        const team = await TeamSchema.findOne({ team_name: team_name.toLowerCase() });
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }

        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, team.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { teamId: team._id, team_name: team.team_name }, 
            process.env.SECRET_KEY, 
            { expiresIn: '2d' } // Token expiration time
        );

        res.status(200).json({ message: 'Login successful', token, teamId: team._id });
    } catch (error) {
        console.error('Error logging in team:', error);
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
    registerTeam,
    loginTeam,
    getAllTeamSchema,
    getTeamById,
    updateTeam,
    deleteTeam
};
