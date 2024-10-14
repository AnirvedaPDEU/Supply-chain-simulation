const Creds = require('../models/credentials.models')

// Register new team
exports.registerTeam = async (req, res) => {
  try {
    const { team_name, password } = req.body;
    const team = new Creds({ team_name, password });
    await team.save();
    res.status(201).json({ message: 'Team registered successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error registering team' });
  }
};

// Login team
exports.loginTeam = async (req, res) => {
  try {
    const { team_name, password } = req.body;
    const team = await Creds.findOne({ team_name });
    if (!team || !(await team.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ teamId: team._id, teamName: team.team_name }, 'yourSecretKey', { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};
