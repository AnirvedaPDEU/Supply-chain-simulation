import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './TeamRegistration.css';

const TeamRegistration = () => {
  const [teamName, setTeamName] = useState('');
  const [password, setPassword] = useState('');
  const [teamMembers, setTeamMembers] = useState(['']);
  const [category, setCategory] = useState('growing'); 
  const [score, setScore] = useState(0); 
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:4000/api/teams/register', {
        team_name: teamName,
        password,
        team_members: teamMembers,
        category,
        score,
      });
      console.log('Team registered:', response.data);

      setTeamName('');
      setPassword('');
      setTeamMembers(['']);
      setCategory('growing');
      setScore(0);

      navigate('/login');
    } catch (error) {
      console.error('Error registering team:', error.message);
    }
  };

  const addMember = () => {
    setTeamMembers([...teamMembers, '']);
  };

  const handleMemberChange = (index, event) => {
    const members = [...teamMembers];
    members[index] = event.target.value;
    setTeamMembers(members);
  };

  return (
    <div className="registration-container">
      <form onSubmit={handleSubmit}>
        <label>Team Name:</label>
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          required
        />
        
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label>Team Members:</label>
        {teamMembers.map((member, index) => (
          <input
            key={index}
            type="text"
            value={member}
            onChange={(e) => handleMemberChange(index, e)}
            placeholder={`Member ${index + 1}`}
            required
          />
        ))}
        <button type="button" onClick={addMember} className="add-member-button">
          Add Member
        </button>
        
        <label>Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="growing">Growing</option>
          <option value="established">Established</option>
        </select>

        <button type="submit" className="submit-button" style={{background:"#f7c04a"}}>Register Team</button>
      </form>

      <p className="login-link">Already registered? <Link to="/login">Go to Login</Link></p>
    </div>
  );
};

export default TeamRegistration;
